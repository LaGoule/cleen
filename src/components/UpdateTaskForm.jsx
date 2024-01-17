// UpdateTaskForm.js
import React, { useState, useContext, useEffect } from 'react';
import { updateTask } from '../provider/firebase-database.js';
import { serverTimestamp } from "firebase/database";
import HouseholdContext from '../store/HouseholdContext.jsx';

import ColorPicker from './ColorPicker.jsx';
import RatingPicker from './RatingPicker.jsx';
import TaskItem from './TaskItem.jsx';

import { X } from '@phosphor-icons/react';


const UpdateTaskForm = (props) => {
    const { household } = useContext(HouseholdContext);

    const [editedTask, setEditedTask] = useState({
        id: props.taskToUpdate.id,
        name: props.taskToUpdate.name, 
        checked: props.taskToUpdate.checked,
        rating: props.taskToUpdate.rating,
        createdAt: props.taskToUpdate.createdAt,
        lastModified: props.taskToUpdate.lastModified,
        color: props.taskToUpdate.color
    });
    const [selectedColor, setSelectedColor] = useState(props.taskToUpdate.color);

    useEffect(() => {
        setEditedTask({
            id: props.taskToUpdate.id,
            name: props.taskToUpdate.name, 
            checked: props.taskToUpdate.checked,
            rating: props.taskToUpdate.rating,
            createdAt: props.taskToUpdate.createdAt,
            lastModified: serverTimestamp(),
            color: props.taskToUpdate.color
        });
    }, [props.taskToUpdate]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (editedTask.name.trim().length === 0) {
            return;
        }
        await updateTask(editedTask, household.id);
        props.setIsEditing(false);
        setSelectedColor('#fff');
    }

    

    return (
        <>
            <a className='closeButton' onClick={() => props.setIsEditing(false)}>
                <X size={32} />
            </a>

            {/* <div className='taskPreview' style={{ marginBottom: '20px', opacity: '.75' }}>
                <TaskItem task={editedTask} />
            </div> */}

            <div className="formGroup">
                <input 
                    value={editedTask.name} 
                    onChange={e => setEditedTask({...editedTask, name: e.target.value})}
                />
                <ColorPicker 
                    task={editedTask} setTask={setEditedTask} 
                    selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                <RatingPicker task={editedTask} setTask={setEditedTask} />

                <button
                    onClick={handleUpdate}
                >Modifier</button>
            </div>
        </>
    );
};

export default UpdateTaskForm;



