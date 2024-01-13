import app from "./firebase-app";
import { getDatabase, ref, get, set, child, remove, update } from "firebase/database";
import {  } from "../store/HouseholdContext";

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Fonction pour obtenir le foyer d'un utilisateur
const getHouseholdForUser = async (userId) => {
  const userRef = ref(db, 'users/' + userId);
  const snapshot = await get(child(userRef, 'householdId'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

// Fonction qui permet de récupérer les taches dans la base de données
const getTasks = (groupId) => {
  const tasksRef = ref(db, `tasks/${groupId}/`);
  return tasksRef;
}

// Fonction qui perment d'ajouter une tache dans la base de données
const addTask = (task, groupId) => {
  const newTaskKey = task.id; // Utilisez l'ID de la tâche comme clé
  const taskRef = ref(db, `tasks/${groupId}/${newTaskKey}`);
  set(taskRef, {
    id: task.id,
    name: task.name,
    checked: false,
    rating: task.rating,
    createdAt: task.createdAt,
    lastModified: task.lastModified,
  });
}

// Fonction qui permet de supprimer une tache dans la base de données
const deleteTask = async (taskId, groupId) => {
  const taskRef = ref(db, `tasks/${groupId}/${taskId}`);
  await remove(taskRef);
}

// Fonction qui permet de modifier une tache dans la base de données
const updateTask = async (task, groupId) => {
  const taskRef = ref(db, `tasks/${groupId}/${task.id}`);
  await update(taskRef, {
    name: task.name,
    checked: task.checked,
    rating: task.rating,
    lastModified: task.lastModified,
  });
}

export default db;
export { getHouseholdForUser, getTasks, addTask, deleteTask, updateTask };