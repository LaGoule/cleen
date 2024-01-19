import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import db from '../providers/firebase-database';
import TaskList from '../components/task/TaskList';
import AddTaskForm from '../components/task/AddTaskForm';
import UpdateTaskForm from '../components/task/UpdateTaskForm';

const PageDashboard = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const userRef = ref(db, 'users/' + props.user.uid);
        const fetchUser = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        });
        return () => {
            off(userRef, 'value', fetchUser);
        }
    }, [props.user.uid]);    

    return (
        <>
            <div id="dashboardPage">
                <div className="card todoListCard">
                    <h2>Liste des tâches</h2>
                    <TaskList 
                        userData={userData}
                        setIsEditing={setIsEditing}
                        setTaskToUpdate={setTaskToUpdate}
                    />
                </div>

                <div className="card addTaskFormCard">
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