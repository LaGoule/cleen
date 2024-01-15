import app from "./firebase-app";
import { get, ref, set } from 'firebase/database';
import db, { checkAndSetHousehold, createAndSetHousehold } from './firebase-database';
import { getAuth, signOut, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Vérifiez si l'utilisateur a un foyer
const checkAndCreateUser = async (user) => {
  if (!user) {
    return;
  }
  const userRef = ref(db, 'users/' + user.uid);
  const snapshot = await get(userRef);
  if (!snapshot.exists()) {
    // Si l'utilisateur n'existe pas, créez l'utilisateur
    await set(userRef, { 
      uid: user.uid,
      name: user.displayName || 'Anonymous',
      email: user.email,
      // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
    });
  } 
  /*
  else {
    // Si l'utilisateur existe, vérifiez si le foyer existe
    const householdRef = ref(db, 'households/' + snapshot.val().householdId);
    const householdSnapshot = await get(householdRef);
    if (householdSnapshot.exists()) {
      
      setHousehold(householdSnapshot.val());
    } else {
      // Si le foyer n'existe pas, créez un nouveau foyer
      await createAndSetHousehold(user, setUser, setHousehold);
    }
  }
  // Définir l'utilisateur après la création ou la vérification du foyer
  setUser(user);
  */
}

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Google");
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

const handleLogin = async (email, password) => {
  try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in with email and password");
      // Enregistrez l'email et le mot de passe dans le localStorage après une connexion réussie
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
  } catch (error) {
      console.error("Error signing in", error);
  }
}

const handlePasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw error;
  }
}

const handleLogout = async (setHousehold) => {
  try {
    await signOut(auth);
    console.log("Signed out successfully");
    setHousehold(null); // Réinitialisez l'état du household
  } catch (error) {
    console.error("Error signing out", error);
    throw error; // Lancez l'erreur pour que le code appelant puisse la gérer
  }
}

export default auth;
export { handleLogin, handleGoogleLogin, handleLogout, handlePasswordReset, checkAndCreateUser };