// AddTaskForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../provider/firebase-database';


const AddTaskForm = (props) => {
    const groupId = "0A1B2C3D4E5F6G7H8I9J"
    const [task, setTask] = useState({name: '', completed: false, createdAt: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask({
            id: uuidv4(),
            name: task.name,
            completed: false,
            rating: 1,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),

        }, groupId);
        setTask({...task, name: ''});
      }

  return (
    <>
      <div className="formGroup">
        <input 
            placeholder='Ajouter une tâche'
            value={task.name} 
            onChange={e => setTask({...task, name: e.target.value})}
        />
        <button
            onClick={handleSubmit}
        >Ajouter</button>
        
        {/* <button
            disabled={!input.trim()}
            style={{ opacity: input.trim() ? '1' : '.75' }}
            onClick={() => {
                props.setTasks([...props.tasks, { 
                    id: uuidv4(),
                    text: input,
                    checked: false,
                    added: new Date()
                }]);
                setInput('');
            }}
        >Ajouter</button> */}
        
        
    </div>
    </>
  );
};

export default AddTaskForm;



