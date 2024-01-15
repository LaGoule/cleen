// AddTaskForm.js
import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../provider/firebase-database';
import { serverTimestamp } from "firebase/database";
import HouseholdContext from '../store/HouseholdContext.jsx';


const AddTaskForm = (props) => {
    const { household } = useContext(HouseholdContext);
    const [task, setTask] = useState({
        name: '', 
        completed: false, 
        rating: 1,
        createdAt: '', 
        color: '#fff'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!task.name.trim()) {
            return;
        }
        await addTask({
            id: uuidv4(),
            name: task.name,
            completed: false,
            rating: task.rating,
            createdAt: serverTimestamp(),
            lastModified: serverTimestamp(),
            color: task.color,
            // assignatedUser: null


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
            <option defaultValue value="#fff" style={{backgroundColor: "#fff", color: "#333"}}>Pas de couleur</option>
            {/* <option value="#ccc" style={{backgroundColor: "#ccc", color: "#333"}}>Gris</option> */}
            <option value="#f9f147" style={{backgroundColor: "#f9f147", color: "#333"}}>Jaune</option>
            <option value="#42E2B8" style={{backgroundColor: "#42E2B8", color: "white"}}>Vert</option>
            <option value="#fc868e" style={{backgroundColor: "#fc868e", color: "white"}}>Rouge</option>
            <option value="#3dadf2" style={{backgroundColor: "#3dadf2", color: "white"}}>Bleu</option>
            <option value="#d8aeed" style={{backgroundColor: "#d8aeed", color: "white"}}>Violet</option>
        </select>
        <select 
            onChange={e => setTask({...task, rating: e.target.value})}
            value={task.rating}
            name="ratingSelector" 
            id="ratingSelector"
        >
            <option defaultValue value="1">⭑</option>
            <option value="2">⭑⭑</option>
            <option value="3">⭑⭑⭑</option>
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



