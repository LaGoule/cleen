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

    // const printRating = () => {
    //     let rating = [];
    //     for (let i = 0; i < 3; i++) {
    //       if (i < ) {
    //         rating.push(<span key={i} className="star-yellow">★</span>);
    //       } else {
    //         // rating.push(<span key={i} className="star-gray">★</span>);
    //       }
    //     }
    //     return rating;
    // }

    return (
        <>
            <li
                onClick={(e) => {
                    if (e.target.tagName === 'INPUT') return;
                    handleEdit();
                }}
                className='taskItem'
                key={props.task.id} 
                style={{
                    background: `linear-gradient(to right, ${props.task.color}, white)`,
                    opacity: props.task.checked ? '.3' : '1',
            }}>
                <input 
                    type="checkbox" 
                    checked={props.task.checked} 
                    onChange={() => props.onTaskToggle(props.task)}
                />
                <span
                    className={props.task.checked ? 'checked taskName' : 'taskName'}
                >{props.task.name}</span>

                {/* <em className='rating'>{printRating()}</em> */}
                <RatingTag rating={props.task.rating} />

                <button className="deleteBtn" onClick={handleDelete} >×</button>
            </li>
        </>
    );
};

export default TaskItem;