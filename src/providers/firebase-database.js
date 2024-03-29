import app from "./firebase-app";
import { getDatabase, get, ref, set, push, remove, update } from "firebase/database";
// import HouseholdContext from "../contexts/HouseholdContext.jsx";

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

let isCreatingHousehold = false;

const setIsCreatingHousehold = (status) => {
  isCreatingHousehold = status;
};

// On check si l'utilisateur a au moins un foyer attitrer
// Si c'est le cas on récupère le premier foyer
// Et on l'enregistre dans le contexte
const checkAndSetHousehold = async (user, setUser, setHousehold) => {
  const householdId = await getHouseholdForUser(user.uid);
  if (householdId) {
    // Récupérez les informations du foyer de la base de données
    const householdSnapshot = await get(ref(db, 'households/' + householdId));
    const householdData = householdSnapshot.val();
    setHousehold(householdData);
    setUser({ ...user, householdId });

    // Vérifiez si l'utilisateur est déjà dans le foyer
    if (!householdData.users || !householdData.users[user.uid]) {
      // Ajoutez l'utilisateur au foyer
      await set(ref(db, 'households/' + householdId + '/users/' + user.uid), true);
      setHousehold({ ...householdData, users: { ...householdData.users, [user.uid]: true } });
    }

    return true;
  }
  return false;
}

// Sinon on créer un foyer a id unique et on l'ajoute a l'utilisateur
const createAndSetHousehold = async (user, setHousehold) => {
  setIsCreatingHousehold(true);
  
  const newHouseholdRef = push(ref(db, 'households'));
  await set(newHouseholdRef, {
    // Ajoutez d'autres propriétés du foyer si nécessaire
    id: newHouseholdRef.key,
    name: user.name ? "Foyer de " + user.name + "" : 'Mon foyer',
    users: {
      [user.uid]: true,
    },
  });
  const householdId = newHouseholdRef.key;
  await set(ref(db, 'users/' + user.uid + '/householdId'), householdId);
  setHousehold({ 
    id: householdId, 
    name: "Foyer de " + user.name + "", 
    users: { [user.uid]: true } 
  });

  // Définissez isCreatingHousehold sur false
  setIsCreatingHousehold(false);
}

const joinHousehold = async (user, householdId) => {
  // Récupérez les informations du foyer de la base de données
  const householdRef = ref(db, 'households/' + householdId);
  const snapshot = await get(householdRef);
  const householdData = snapshot.val();

  // Vérifiez si l'utilisateur est déjà dans le foyer
  if (!householdData.users || !householdData.users[user.uid]) {
      // Ajoutez l'utilisateur au foyer
      await set(ref(db, 'households/' + householdId + '/users/' + user.uid), true);
  }
};

// Fonction pour obtenir le foyer d'un utilisateur
const getHouseholdForUser = async (userId) => {
  console.log(`Récupération du foyer pour l'utilisateur: ${userId}...`);

  // Créez une référence à l'utilisateur dans la base de données
  const userRef = ref(db, 'users/' + userId);
  // Récupérez les données de l'utilisateur
  const userSnapshot = await get(userRef);
  // Vérifiez si l'utilisateur existe
  if (!userSnapshot.exists()) {
    console.log(`L'utilisateur ${userId} n'existe pas dans la base de données.`);
    return null;
  }

  // Récupérez l'ID du foyer de l'utilisateur
  const householdId = userSnapshot.val().householdId;
  // Vérifiez si l'utilisateur a un ID de foyer
  if (!householdId) {
    console.log(`L'utilisateur ${userId} n'a pas d'ID de foyer.`);
    return null;
  }
  
  return householdId;
}

// Fonction qui permet de récupérer les taches dans la base de données
const getTasks = async (householdId) => {
  console.log(`Récupération des tâches pour le foyer: ${householdId}...`);

  // Créez une référence aux tâches du foyer dans la base de données
  const tasksRef = ref(db, 'tasks/' + householdId);
  // Récupérez les données des tâches
  const tasksSnapshot = await get(tasksRef);
  // Vérifiez si il y a des tâches pour ce foyer
  if (!tasksSnapshot.exists()) {
    console.log(`Il n'y a pas de tâches pour le foyer ${householdId}.`);
    return null;
  }
  // Retournez les données des tâches
  return tasksSnapshot.val();
}

// Fonction qui permet d'ajouter une tache dans la base de données
const addTask = async (task, householdId) => {
  const newTaskKey = task.id; // Utilisez l'ID de la tâche comme clé
  const taskRef = ref(db, `tasks/${householdId}/${newTaskKey}`);
  await set(taskRef, {
    id: task.id,
    name: task.name,
    checked: { status: false, user: null },
    rating: task.rating,
    createdAt: task.createdAt,
    lastModified: task.lastModified,
    color: task.color,
    // assignatedUser: null
  });
}

// Fonction qui permet de modifier une tache dans la base de données
const updateTask = async (task, householdId) => {
  const taskRef = ref(db, `tasks/${householdId}/${task.id}`);
  await update(taskRef, {
    name: task.name,
    checked: task.checked !== undefined ? task.checked : { status: false, user: null },
    rating: task.rating,
    lastModified: task.lastModified,
    color: task.color,
    // assignatedUser: task.assignatedUser
  });
}

// Fonction qui permet de supprimer une tache dans la base de données
const deleteTask = async (taskId, householdId) => {
  const taskRef = ref(db, `tasks/${householdId}/${taskId}`);
  await remove(taskRef);
}

export default db;
export { checkAndSetHousehold, createAndSetHousehold, joinHousehold, getHouseholdForUser, getTasks, addTask, deleteTask, updateTask };