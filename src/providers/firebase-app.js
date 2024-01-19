import { initializeApp } from "firebase/app";

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

export default app;