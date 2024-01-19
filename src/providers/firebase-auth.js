import { getAuth, signOut, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, GoogleAuthProvider } from "firebase/auth";
import md5 from 'md5';
import { get, ref, set } from 'firebase/database';
import app from "./firebase-app";
import db from './firebase-database';


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Vérifiez si l'utilisateur existe dans la base de données et le crée s'il n'existe pas
const checkAndCreateUser = async (user) => {
  if (!user) {
    return;
  }
  const userRef = ref(db, 'users/' + user.uid);
  const snapshot = await get(userRef);
  if (!snapshot.exists()) {
    // Si l'utilisateur n'existe pas on doit le créer
    await set(userRef, { 
      // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
      uid: user.uid,
      name: user.displayName || 'Anonymous',
      email: user.email,
      photoURL: user.photoURL || ('https://www.gravatar.com/avatar/' + md5(user.email) + '?s=150'),
    });
  } 
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
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
  } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          alert("Erreur de connexion. Veuillez vérifier votre email et votre mot de passe.");
          break;
        default:
          console.log('Erreur inconnue: ', error.code, error.message);
          alert('Erreur inconnue. ', error.code, error.message);
          break;
      }
  }
}

const handleLogout = async (setHousehold) => {
  try {
    await signOut(auth);
    setHousehold(null);
    console.log("Signed out successfully");
  } catch (error) {
    console.error("Error signing out", error);
    throw error; // Lancez l'erreur pour que le code appelant puisse la gérer
  }
}

const handlePasswordReset = async (email) => {
  alert('Test: Password reset email sent');
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw error;
  }
}

export default auth;
export { handleLogin, handleGoogleLogin, handleLogout, handlePasswordReset, checkAndCreateUser };