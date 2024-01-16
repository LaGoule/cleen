// TaskList.js
import React, { useState, useContext, useEffect, useCallback } from 'react';
import HouseholdContext from '../store/HouseholdContext.jsx';
import { ref, onValue, off, set } from 'firebase/database';
import db from '../provider/firebase-database';

import { v4 as uuidv4 } from 'uuid';
import { getTasks, updateTask } from '../provider/firebase-database';

import LoadingSpinner from './LoadingSpinner';
import AddTaskForm from './AddTaskForm';
import SearchFilter from './SearchFilter';
import TaskItem from './TaskItem';


const TaskList = () => {
    const { household } = useContext(HouseholdContext);

    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const sortTasks = useCallback((tasks) => {
        let sortedTasks = [...tasks];
        switch(sort) {
            case 'alphabetical':
                sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
            case 'added':
                sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
                break;
        }
        return sortedTasks;
    }, [sort]);

    const handleTaskToggle = async (task) => {
        // Créez une copie de la tâche et modifiez la propriété 'checked'
        const updatedTask = { ...task, checked: !task.checked };
    
        // Mettez à jour la tâche dans Firebase
        try {
          await updateTask(updatedTask, household.uid);
          console.log("Task updated successfully");
        } catch (error) {
          console.error("Error updating task", error);
        }
    }
    let sortedTasks = sortTasks(tasks);


    useEffect(() => {
        const tasksRef = ref(db, 'tasks/' + household.uid);
        const fetchTasks = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const taskList = [];
            for(let id in data) {
                taskList.push({ firebaseKey: id, ...data[id] });
            }
            setTasks(taskList);
            setIsLoading(false); 
        });
        
        return () => {
            // Arrêtez d'écouter les mises à jour lorsque le composant est démonté
            off(tasksRef, fetchTasks);
        };

            setIsLoading(false); 

    }, [household.uid]);

    // //Ecran de chargement 
    // if (isLoading) {
    //     return <LoadingSpinner />; 
    // }

    return (
        <>
            <SearchFilter 
                filter={filter} setFilter={setFilter} 
                sort={sort} setSort={setSort} 
            />
            
            <ul className="todoList">
                {
                    isLoading ? 
                        <p>Chargement</p>
                    : tasks.length === 0 ?
                        <p>Aucune tâche…</p>
                    :
                    sortedTasks.flatMap((task) => (
                        task.name
                            .toLowerCase()
                            .includes(filter.toLowerCase()) ? 
                                
                                <li 
                                    key={uuidv4()} 
                                    style={{
                                        background: `linear-gradient(to right, ${task.color}, white)`,
                                        opacity: task.checked ? '.3' : '1',
                                }}>
                                    <TaskItem 

                                        task={task}
                                        onTaskToggle={handleTaskToggle}
                                        setTasks={setTasks}
                                        tasks={tasks}
                                    />
                                </li>
                            :
                                []
                    ))
                }
            </ul>
        </>
    );
};

export default TaskList;