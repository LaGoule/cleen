// TaskList.js
import React, { useState, useEffect, useCallback } from 'react';
import { onValue } from 'firebase/database';

import { v4 as uuidv4 } from 'uuid';
import { getTasks, updateTask } from '../provider/firebase-database';

import AddTaskForm from './AddTaskForm';
import SearchFilter from './SearchFilter';
import TaskItem from './TaskItem';


const TaskList = (props) => {
    const groupId = "0A1B2C3D4E5F6G7H8I9J"
    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const tasksRef = getTasks(groupId);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const taskList = [];
          for(let id in data) {
              taskList.push({ firebaseKey: id, ...data[id] });
          }
          setTasks(taskList);
        });
      }, [groupId]);

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
          await updateTask(updatedTask, groupId);
          console.log("Task updated successfully");
        } catch (error) {
          console.error("Error updating task", error);
        }
      }







    let sortedTasks = sortTasks(tasks);

    return (
        <>
            <SearchFilter 
                filter={filter} setFilter={setFilter} 
                sort={sort} setSort={setSort} 
            />

            <hr/>
            
            <ul className="todoList">
                {
                    tasks.length === 0 ?
                    <p>Aucune tâche…</p>
                    :
                    sortedTasks.flatMap((task, index) => (
                        task.name
                            .toLowerCase()
                            .includes(filter.toLowerCase()) ? 
                                <li 
                                    key={uuidv4()} 
                                    style={{
                                        backgroundColor: task.checked ? '#333' : '#444',
                                        textDecoration: task.checked ? 'line-through' : 'none'
                                }}>
                                    <TaskItem 
                                    
                                        task={task}
                                        onTaskToggle={handleTaskToggle}
                                        setTasks={setTasks}
                                        tasks={tasks}
                                        groupId={groupId}
                                    />
                                </li>
                            :
                                []
                    ))
                }
            </ul>

            <AddTaskForm setTasks={setTasks} tasks={tasks} />
        </>
    );
};

export default TaskList;