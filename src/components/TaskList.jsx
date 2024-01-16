// TaskList.js
import React, { useState, useContext, useEffect, useCallback } from 'react';
import HouseholdContext from '../store/HouseholdContext.jsx';
import { ref, onValue, off, set } from 'firebase/database';
import db, { updateTask } from '../provider/firebase-database';

import FilteredTaskList from './FilteredTaskList.jsx';
import SearchFilter from './SearchFilter';
import TaskItem from './TaskItem';


const TaskList = (props) => {

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
            case 'rating':
                sortedTasks.sort((a, b) => b.rating - a.rating);
                break;
        }
        return sortedTasks;
    }, [sort]);

    const handleTaskToggle = async (task) => {
        // Créez une copie de la tâche et modifiez la propriété 'checked'
        const updatedTask = { ...task, checked: !task.checked };
    
        // Mettez à jour la tâche dans Firebase
        try {
          await updateTask(updatedTask, household.id);
          console.log("Task updated successfully");
        } catch (error) {
          console.error("Error updating task", error);
        }
    }
    let sortedTasks = sortTasks(tasks);


    useEffect(() => {
        const tasksRef = ref(db, 'tasks/' + household.id);
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
    }, [household.id]);


    const completedTasks = sortedTasks.filter(task => task.checked);
    const incompleteTasks = sortedTasks.filter(task => !task.checked);


    return (
        <>
            <SearchFilter 
                filter={filter} setFilter={setFilter} 
                sort={sort} setSort={setSort} 
            />
            
            <ul className="todoList">
                {
                    tasks.length === 0 ?
                        <p>Aucune tâche…</p>
                    :
                    <>
                        {/* <h4>À faire</h4> */}
                        <FilteredTaskList 
                            tasks={incompleteTasks}
                            filter={filter}
                            handleTaskToggle={handleTaskToggle}
                            setTasks={setTasks}
                            setIsEditing={props.setIsEditing}
                            setTaskToUpdate={props.setTaskToUpdate}
                        />
                        {
                            completedTasks.length === 0 ? null :
                            <>
                                <hr/>

                                {/* <h4>Tâches terminées</h4> */}
                                <FilteredTaskList 
                                    tasks={completedTasks}
                                    filter={filter}
                                    handleTaskToggle={handleTaskToggle}
                                    setTasks={setTasks}
                                    setIsEditing={props.setIsEditing}
                                    setTaskToUpdate={props.setTaskToUpdate}
                                />
                            </>
                        }
                    </>
                }
            </ul>
        </>
    );
};

export default TaskList;