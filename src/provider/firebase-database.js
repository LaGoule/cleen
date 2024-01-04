import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAuJOBYOfR2WCqlthbpRRDMRBr8_aQpL8o",
  authDomain: "cleen-63d70.firebaseapp.com",
  databaseURL: "https://cleen-63d70-default-rtdb.firebaseio.com",
  projectId: "cleen-63d70",
  storageBucket: "cleen-63d70.appspot.com",
  messagingSenderId: "574534981488",
  appId: "1:574534981488:web:2ddae17992cfa9796be1b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
//console.log(db);










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



// Fonction qui permet de modifier une tache dans la base de données
// const updateTask = (taskId, task) => {
//   const taskRef = database.ref('tasks/' + taskId);
//   taskRef.update(task);
// }






export default db;
export { getTasks, addTask, deleteTask };