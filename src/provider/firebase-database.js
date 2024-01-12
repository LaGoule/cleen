import app from "./firebase-app";
import { getDatabase, ref, set, remove, update } from "firebase/database";

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Fonction qui permet de récupérer les taches dans la base de données
const getTasks = (groupId) => {
  const tasksRef = ref(db, `tasks/${groupId}/`);
  return tasksRef;
}

// Fonction qui perment d'ajouter une tache dans la base de données
const addTask = (task, groupId) => {
  const db = getDatabase();
  const newTaskKey = task.id; // Utilisez l'ID de la tâche comme clé
  const taskRef = ref(db, `tasks/${groupId}/${newTaskKey}`);
  set(taskRef, {
    id: task.id,
    name: task.name,
    completed: false,
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

export default db;
export { getTasks, addTask, deleteTask };