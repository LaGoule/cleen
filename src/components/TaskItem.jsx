// TaskItem.jsx
import React, { useState, useContext, useRef } from 'react';
import { ref, set, update } from "firebase/database";
import db, { updateTask, deleteTask } from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext.jsx';

import RatingTag from './RatingTag.jsx';



const TaskItem = (props) => {
    const { household } = useContext(HouseholdContext);

    //Fonction pour supprimer une tâche
    const handleDelete = () => {
        deleteTask(props.task.firebaseKey, household.id);
    };

    const handleEdit = () => {
        props.setIsEditing(true);
        props.setTaskToUpdate(props.task);
    };

    return (
        <>
            <li
                onClick={(e) => {
                    if (
                        e.target.tagName === 'INPUT' ||
                        e.target.tagName === 'BUTTON' || 
                        props.task.checked.status
                    ) return;
                    handleEdit();
                }}
                className={props.task.checked.status ? 'checked taskItem' : 'taskItem'}
                key={props.task.id} 
                style={{
                    background: `linear-gradient(to right, ${props.task.color}, white)`
            }}>
                <input 
                    type="checkbox" 
                    checked={props.task.checked.status} 
                    onChange={() => props.onTaskToggle(props.task)}
                />
                <span
                    className={props.task.checked.status ? 'checked taskName' : 'taskName'}
                >{props.task.name}</span>

                <RatingTag rating={props.task.rating} isEditing={props.isEditing} />

                <button className="deleteBtn" onClick={handleDelete} >×</button>
            </li>
        </>
    );
};

export default TaskItem;