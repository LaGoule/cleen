import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';

const PageDashboard = () => {
    
    return (
        <>
            <div id="dashboardPage">
                <div className="card todoListCard">
                    <h2>Liste des tâches</h2>
                    <TaskList />
                </div>
                <div className="card addTaskCard">
                    <h2>Ajoutez une tâche</h2>
                    <AddTaskForm />
                </div>
            </div>
        </>
    );
}

export default PageDashboard;