import app from "./firebase-app";
import { getAuth, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(app);

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Signed out successfully");
  } catch (error) {
    console.error("Error signing out", error);
    throw error; // Lancez l'erreur pour que le code appelant puisse la gérer
  }
}

const handleLogin = async (email, password) => {
  try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
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

export default auth;
export { handleLogin, handleLogout, handlePasswordReset };