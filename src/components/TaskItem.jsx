// TaskItem.jsx
import React, { useState, useContext, useRef } from 'react';
import { ref, set, update } from "firebase/database";
import db, { updateTask, deleteTask } from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext.jsx';



const TaskItem = (props) => {
    const { household } = useContext(HouseholdContext);
    const [isEditing, setIsEditing] = useState(false);

    const [editText, setEditText] = useState(props.task.text);
    const editInput = useRef();

    const [editedTask, setEditedTask] = useState({
        id: props.task.id,
        name: props.task.name, 
        checked: props.task.checked,
        rating: props.task.rating,
        createdAt: props.task.createdAt,
        lastModified: props.task.lastModified,
        color: props.task.color

    });



    //Fonction pour supprimer une tâche
    const handleDelete = () => {
        deleteTask(props.task.firebaseKey, household.uid);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTask(prevState => ({ ...prevState, name: props.task.name }));
        setTimeout(() => editInput.current.focus(), 0);
    };

    const handleSave = async () => {
        setIsEditing(false);
        if (editedTask.name.trim().length === 0) {
            return;
        }
        const newTasks = props.tasks.map(task =>
            task.uid === props.task.uid ? editedTask : task
        );
        props.setTasks(newTasks);
    
        // Update the task in the database
        await updateTask(editedTask, household.uid); // replace householdId with the actual id
    };

    const handleTextChange = (event) => {
        setEditText(event.target.value);
    };

    const printRating = () => {
        let rating = [];
        for (let i = 0; i < 3; i++) {
          if (i < props.task.rating) {
            rating.push(<span key={i} className="star-yellow">★</span>);
          } else {
            // rating.push(<span key={i} className="star-gray">★</span>);
          }
        }
        return rating;
      }

    const renderTask = () => {
        if (isEditing) {
            return (
                <div
                >
                    <input type="text" ref={editInput} value={editedTask.name} onChange={handleTextChange} />
                    <button className="saveBtn" onClick={handleSave}>Enregistrer</button>
                </div>
            );
        } else {
            return (
                <div
                >
                    <input 
                        type="checkbox" 
                        checked={props.task.checked} 
                        onChange={() => props.onTaskToggle(props.task)}
                    />
                    <span
                        className={props.task.checked ? 'checked' : ''}
                    >{props.task.name}</span>
                    <em className='rating'>{printRating()}</em>
                    {/* <button className="editBtn" onClick={handleEdit}>modifier</button> */}
                    <button className="deleteBtn" onClick={handleDelete} >×</button>
                </div>
            );
        }
    };

    return renderTask();
};

export default TaskItem;