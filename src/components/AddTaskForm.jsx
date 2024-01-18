// AddTaskForm.js
import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../provider/firebase-database';
import { serverTimestamp } from "firebase/database";
import HouseholdContext from '../store/HouseholdContext.jsx';

import ColorPicker from './ColorPicker.jsx';
import RatingPicker from './RatingPicker.jsx';


const AddTaskForm = () => {
    const { household } = useContext(HouseholdContext);
    const [task, setTask] = useState({
        name: '', 
        checked: { status: false, user: null }, 
        rating: 1,
        color: '#EEE'
    });
    const [selectedColor, setSelectedColor] = useState('#EEE');
    const placeholderTasks = [
        "Sortir les poubelles",
        "Passer l'aspirateur",
        "Laver la voiture",
        "Faire les courses",
        "Promener le chien",
        "Arroser les plantes",
        "Faire la vaisselle",
        "Passer la serpillère",
        "Faire la lessive",
        "Changer les draps",
        "Préparer le repas",
        "Nettoyer la salle de bain",
        "Ranger les placards",
        "Faire le lit",
        "Nettoyer les vitres",
        "Faire la poussière",
        "Passer l'aspirateur",
        "Nettoyer le réfrigérateur",
        "Nettoyer le four",
        "Nettoyer le micro-ondes",
        "Passer l'aspirateur",
        "Ranger la chambre",
    ];
    const [randomTask, setRandomTask] = useState(placeholderTasks[0]);
    const getRandomPlaceholderTask = () => {
        const newTask = placeholderTasks[Math.floor(Math.random() * placeholderTasks.length)];
        return newTask;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!task.name.trim()) {
            return;
        }
        await addTask({
            id: uuidv4(),
            name: task.name,
            checked: { status: false, user: null},
            rating: task.rating,
            createdAt: serverTimestamp(),
            lastModified: serverTimestamp(),
            color: task.color,
            // assignatedUser: null
        }, household.id);
        // Reinitialise le formulaire
        setTask({...task, name: '', rating: 1, color: '#EEE'});
        setSelectedColor('#EEE');
      }

    useEffect(() => {
        const newRandomTask = getRandomPlaceholderTask();
        setRandomTask(newRandomTask);
    }, []);

  return (
    <>
        <form>
            <input 
                placeholder={randomTask}
                value={task.name} 
                onChange={e => setTask({...task, name: e.target.value})}
            />
            <ColorPicker 
                task={task} setTask={setTask} defaultColor={''} 
                selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <RatingPicker task={task} setTask={setTask} />

            <button type="submit"
                onClick={handleSubmit}
            >Ajouter</button>
        </form>
    </>
  );
};

export default AddTaskForm;



