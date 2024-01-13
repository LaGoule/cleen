// TaskItem.jsx
import React, { useState, useCallback, useRef } from 'react';
import { getDatabase, ref, remove } from "firebase/database";
import { deleteTask } from '../provider/firebase-database';


const TaskItem = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.task.text);
    const editInput = useRef();


    //Fonction pour supprimer une tâche
    const handleDelete = () => {
        deleteTask(props.task.firebaseKey, props.groupId);
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
                    style={{
                        backgroundColor: props.task.checked ? '#333' : '#444',
                    }}
                >
                    <input 
                        type="checkbox" 
                        checked={props.task.checked} 
                        onChange={() => props.handleCheck(props.task)}
                    />
                    <span
                        // style={{
                        //     textDecoration: props.task.checked ? 'line-through' : 'none',
                        //     color: props.task.checked ? '#666' : 'white'
                        // }}
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