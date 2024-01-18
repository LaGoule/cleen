import React, { useContext, useEffect, useState, useCallback } from 'react';
import { onValue, ref, update, off } from "firebase/database";
import db, { updateTask } from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext';
// import FilteredTaskList from '../components/FilteredTaskList';
// import { sortTasks } from '../components/TaskList';
import TaskHistory from '../components/TaskHistory';
import CodeSharer from '../components/CodeSharer';
import { EnvelopeSimple } from  '@phosphor-icons/react';


const PageProfile = (props) => {

    const { household } = useContext(HouseholdContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newProfileData, setNewProfilData] = useState({ displayName: '',email: '' });
    const [isLoading, setIsLoading] = useState(true);

    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setNewProfilData({ 
            displayName: userData ? userData.name : '',
            email: props.user.email,
        } );
    };

    const handleProfilChange = (event) => {
        setNewProfilData({ 
            displayName: event.target.value 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = ref(db, 'users/' + props.user.uid);
        await update(userRef, { name: newProfileData.displayName });
        setUserData({ ...userData, name: newProfileData.displayName });
        setIsEditing(false);
    };

    const handleTaskToggle = async (task) => {
        // Créez une copie de la tâche et modifiez la propriété 'checked'
        const updatedTask = { ...task };
        
        // Si la tâche est complétée, ajoutez l'utilisateur actuel comme celui qui a complété la tâche
        if (!task.checked.status) {
            updatedTask.checked = { status: true, user: props.userData.uid };
        } else {
            updatedTask.checked = { status: false, user: null };
        }
        
        // Mettez à jour la tâche dans Firebase
        try {
            await updateTask(updatedTask, household.id);
            if (updatedTask.checked.status) {
                console.log("Tâche complétée par", props.userData.name);
            } else {
                console.log("Tâche incomplète!", updatedTask.checked.user);
            }
        } catch (error) {
            console.error("Error updating task", error);
        }
    }

    useEffect(() => {
        const userRef = ref(db, 'users/' + props.user.uid);
    
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        }, {
            onlyOnce: true,
        });
    
        // Nettoyer l'abonnement lors du démontage du composant
        return () => unsubscribe();
    }, [db, props.user.uid]);

    const sortTasks = useCallback((tasks) => {
        let sortedTasks = [...tasks];
        switch(sort) {
            case 'alphabetical':
                sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
            case 'added':
                sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case 'rating':
                sortedTasks.sort((a, b) => b.rating - a.rating);
                break;
            case 'color':
                sortedTasks.sort((a, b) => a.color.localeCompare(b.color));
                break;
            case 'random':
                sortedTasks.sort(() => Math.random() - 0.5);
                break;
        }
        return sortedTasks;
    }, [sort]);
    
    useEffect(() => {
        const tasksRef = ref(db, 'tasks/' + household.id);
        const fetchTasks = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const taskList = [];
            for(let id in data) {
                taskList.push({ firebaseKey: id, ...data[id] });
            }
            setTasks(taskList);
            setIsLoading(false); 

            // let sortedTasks = taskList;
            let sortedTasks = sortTasks(taskList);
            setCompletedTasks(sortedTasks.filter(task => 
                task.checked.user === props.user.uid));
        });
        
        return () => {
            // Arrêtez d'écouter les mises à jour lorsque le composant est démonté
            off(tasksRef, fetchTasks);
        };
    }, [household.id/*, sortTasks*/]);
    
    return (
        <>
        <div id="profilePage">
            <div className="card profileCard">
                {/* <h2>Profile</h2> */}
                {
                isEditing ? 
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={newProfileData.displayName} onChange={handleProfilChange} />
                        <input type="text" value={props.user.email} onChange={handleProfilChange} disabled />
                        {/* <button 
                            onClick={setIsEditing(false)}>Annuler</button> */}
                        <button type="submit"
                            onClick={handleSubmit}>Enregistrer</button>
                    </form>
                : userData ?
                    <>
                        <div className="profilCard">
                            <div id={userData.uid} className='avatar'></div>
                            {/* <img src={userData.photoURL ? userData.photoURL : ''} alt="avatar" /> */}
                            <h3 className="username">{userData.name ? userData.name : 'Annonyme'}</h3>
                            <p className="usermail">{userData.email}
                            <EnvelopeSimple size={18} weight="bold" /></p>
                            <button onClick={handleEditClick}>Modifier</button>
                        </div>
                    </>
                :
                    <></>
                }
                
                <hr />

                {
                    household.id ? 
                        <CodeSharer household={household} />
                    :
                        <p>Pas de foyer...</p>
                        // TODO: Option pour créer un foyer
                }
            </div>

            <div className="card historyCard">
                <h2>Historique des tâches</h2>
                <TaskHistory 
                    userData={props.userData}
                    tasks={completedTasks}
                    filter={''}
                    handleTaskToggle={handleTaskToggle}
                    setTasks={setTasks}
                    setIsEditing={''}
                    setTaskToUpdate={''}
                    setSort={setSort}
                />
            </div>
        </div>
        </>
    );
}

export default PageProfile;