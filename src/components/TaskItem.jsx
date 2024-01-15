// TaskItem.jsx
import React, { useState, useContext, useRef } from 'react';
import { deleteTask } from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext.jsx';



const TaskItem = (props) => {
    const { household } = useContext(HouseholdContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.task.text);
    const editInput = useRef();


    //Fonction pour supprimer une tâche
    const handleDelete = () => {
        deleteTask(props.task.firebaseKey, household.uid);
    };

    // const handleEdit = () => {
    //     setIsEditing(true);
    //     setTimeout(() => editInput.current.focus(), 0);
    // };

    // const handleSave = () => {
    //     setIsEditing(false);
    //     if (editText.length === 0) {
    //         handleDelete();
    //         return;
    //     }
    //     const editedTask = { ...props.task, text: editText };
    //     const newTasks = props.tasks.map(task =>
    //         task.id === editedTask.id ? editedTask : task
    //     );
    //     props.setTasks(newTasks);
    // };

    const handleTextChange = (event) => {
        setEditText(event.target.value);
    };

    const renderTask = () => {
        if (isEditing) {
            return (
                <div
                >
                    <input type="text" ref={editInput} value={editText} onChange={handleTextChange} />
                    {/* <button className="saveBtn" onClick={handleSave}>Enregistrer</button> */}
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
                    {/* <button className="editBtn" onClick={handleEdit} >Modifier</button> */}
                    <button className="deleteBtn" onClick={handleDelete} >×</button>
                </div>
            );
        }
    };

    return renderTask();
};

export default TaskItem;