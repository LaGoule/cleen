import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import UpdateTaskForm from '../components/UpdateTaskForm';

const PageDashboard = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState({});

    return (
        <>
            <div id="dashboardPage">
                <div className="card todoListCard">
                    <h2>Liste des tâches</h2>
                    <TaskList 
                        setIsEditing={setIsEditing}
                        setTaskToUpdate={setTaskToUpdate}
                    />
                </div>

                <div className="card taskFormCard">
                    <h2>Ajoutez une tâche</h2>
                    <AddTaskForm 
                    />
                </div>

                { 
                    isEditing && taskToUpdate ?
                        <div 
                            id="popupWrapper"  
                            onClick={(e) => {
                                if (e.target.closest('.card')){
                                    return;
                                }
                                setIsEditing(false)
                            }}
                        >
                            <div className="card taskFormCard">
                                <h2>Modifier la tâche</h2>
                                <UpdateTaskForm
                                    taskToUpdate={taskToUpdate}
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                        </div>  
                    :
                        <></>
                }
            </div>
        </>
    );
}

export default PageDashboard;