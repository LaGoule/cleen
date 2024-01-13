import app from "./firebase-app";
import { getDatabase, ref, get, set, child, remove, update } from "firebase/database";
import HouseholdContext from "../store/HouseholdContext";

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

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
    checked: false,
    rating: task.rating,
    createdAt: task.createdAt,
    lastModified: task.lastModified,
  });
}

// Fonction qui permet de supprimer une tache dans la base de données
const deleteTask = async (taskId, householdId) => {
  const taskRef = ref(db, `tasks/${householdId}/${taskId}`);
  await remove(taskRef);
}

// Fonction qui permet de modifier une tache dans la base de données
const updateTask = async (task, householdId) => {
  const taskRef = ref(db, `tasks/${householdId}/${task.id}`);
  await update(taskRef, {
    name: task.name,
    checked: task.checked,
    rating: task.rating,
    lastModified: task.lastModified,
  });
}

export default db;
export { getHouseholdForUser, getTasks, addTask, deleteTask, updateTask };