import app from "./firebase-app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default auth;
export { signIn };