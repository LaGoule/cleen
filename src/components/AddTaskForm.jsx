// AddTaskForm.js
import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../provider/firebase-database';
import { serverTimestamp } from "firebase/database";
import HouseholdContext from '../store/HouseholdContext.jsx';


const AddTaskForm = (props) => {
    const { household } = useContext(HouseholdContext);
    const [task, setTask] = useState({name: '', completed: false, createdAt: '', color: '#66666'});

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!task.name.trim()) {
            return;
        }
        await addTask({
            id: uuidv4(),
            name: task.name,
            completed: false,
            rating: 1,
            createdAt: serverTimestamp(),
            lastModified: serverTimestamp(),
            color: task.color,
            assignatedUser: null


        }, household.uid);
        setTask({...task, name: ''});

        console.log('Création dune tâche: '+task.name+' dans le foyer: '+household.uid);
      }

  return (
    <>
      <div className="formGroup">
        <input 
            placeholder='Ajouter une tâche'
            value={task.name} 
            onChange={e => setTask({...task, name: e.target.value})}
        />
        <select 
            onChange={e => setTask({...task, color: e.target.value})} 
            value={task.color} 
            name="colorSelector" 
            id="colorSelector"
        >
            <option default value="#444444">--Couleur--</option>
            {/* <option value="#444444">Gris</option> */}
            <option value="#EB8A90">Rouge</option>
            <option value="#2D82B7">Bleu</option>
            <option value="#42E2B8">Vert</option>
        </select>
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



