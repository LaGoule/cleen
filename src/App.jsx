// App.jsx
import './App.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { push, get, ref, set } from 'firebase/database';
import auth, { handleLogout } from './provider/firebase-auth';
import db, { getHouseholdForUser } from './provider/firebase-database'; 
import HouseholdContext from './store/HouseholdContext';

import Page404 from './pages/Page404';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
import PageDetail from './pages/PageDetail';
import PageProfile from './pages/PageProfile';
import PageHousehold from './pages/PageHousehold';
import PageHome from './pages/PageHome';

function App() {

  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [household, setHousehold] = useState(null);
  const [isCreatingHousehold, setIsCreatingHousehold] = useState(false);


  // On check si l'utilisateur n'est pas présent dans la base de données
  // Si c'est le cas on le créer
  const checkAndCreateUser = async (user, setUser) => {
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
    // Vérifiez si l'utilisateur a un foyer
    const hasHousehold = await checkAndSetHousehold(user, setUser);
    // Si l'utilisateur n'a pas de foyer, créez un nouveau foyer
    if (!hasHousehold) {
      await createAndSetHousehold(user, setUser);
    }
    // Définir l'utilisateur après la création ou la vérification du foyer
    setUser(user);
  }

  // On check si l'utilisateur a au moins un foyer attitrer
  // Si c'est le cas on récupère le premier foyer
  // Et on l'enregistre dans le contexte
  const checkAndSetHousehold = async (user, setUser) => {
    const householdId = await getHouseholdForUser(user.uid);
    if (householdId) {
      // Récupérez les informations du foyer de la base de données
      const householdSnapshot = await get(ref(db, 'households/' + householdId));
      const householdData = householdSnapshot.val();
      setHousehold(householdData);
      setUser({ ...user, householdId });
      // Ajoutez l'utilisateur au foyer
      await set(ref(db, 'households/' + householdId + '/users/' + user.uid), true);

      setHousehold({ ...householdData, users: { ...householdData.users, [user.uid]: true } });

      return true;
    }
    return false;
  }

  // Sinon on créer un foyer a id unique et on l'ajoute a l'utilisateur
  const createAndSetHousehold = async (user, setUser) => {
    // Vérifiez si il n'y a pas d'utilisateur ou si un foyer est en cours de création
    if (!user || isCreatingHousehold) {
      return;
    }
  
    // Vérifiez si l'utilisateur a déjà un foyer
    const existingHouseholdId = await getHouseholdForUser(user.uid);
    if (existingHouseholdId) {
      return;
    }
  
    // Définissez isCreatingHousehold sur true
    setIsCreatingHousehold(true);
    
    const newHouseholdRef = push(ref(db, 'households'));
    await set(newHouseholdRef, {
      // Ajoutez d'autres propriétés du foyer si nécessaire
      uid: newHouseholdRef.key,
      name: "Foyer de " + user.displayName + "",
      users: {
        [user.uid]: true, // Ajoutez l'utilisateur au foyer
      },
    });
    const householdId = newHouseholdRef.key;
    await set(ref(db, 'users/' + user.uid + '/householdId'), householdId);
    setUser({ ...user, householdId });
    setHousehold({ uid: householdId, name: "Foyer de " + user.displayName + "", users: { [user.uid]: true } });
  
    // Définissez isCreatingHousehold sur false
    setIsCreatingHousehold(false);
  }














  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkAndCreateUser(user, setUser);
      } else {
        setUser(null);
      }
    });
  
    // Nettoyage de l'effet
    return () => unsubscribe();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
  }

  const navLinkStyle = (isActive) => {
    return {
      fontWeight: isActive ? 'bold' : '400'
    }
  }

  return (
    <>
      <HouseholdContext.Provider value={{ household, householdId: user?.householdId }}>
        <header>
          <h1>Cleen</h1>

          { user ?
            <nav>
              <ul>
                  <>
                    <li><NavLink to="/home" style={({ isActive }) => (navLinkStyle(isActive))}>Dashboard</NavLink></li>
                    <li><NavLink to="/household" style={({ isActive }) => (navLinkStyle(isActive))}>Foyer</NavLink></li>
                    <li><NavLink to="/profile" style={({ isActive }) => (navLinkStyle(isActive))}>Profile</NavLink></li>
                    <li><a onClick={logout}
                    >Déconnexion</a></li>
                    <li></li>
                  </>
              </ul>
            </nav>
          :
            <></>   
          }
        </header>

        <Routes>
          <Route path="/" element={user ? <PageHome /> : <PageLogin />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/signup" element={<PageSignup />} />
          <Route path="/home" element={user ? <PageHome /> : <PageLogin />} />
          <Route path="/profile" element={user ? <PageProfile user={user} /> : <PageLogin />} />
          <Route path="/household" element={user ? <PageHousehold /> : <PageLogin />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HouseholdContext.Provider>
    </>
  )
}

export default App;
