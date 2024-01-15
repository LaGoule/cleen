// App.jsx
import './App.css'
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
// import { push, get, ref, set, update } from 'firebase/database';
// import db, { getHouseholdForUser, checkAndSetHousehold, createAndSetHousehold } from './provider/firebase-database';
import { onAuthStateChanged } from 'firebase/auth';
import auth, { handleLogout, checkAndCreateUser } from './provider/firebase-auth';
import HouseholdContext, { HouseholdProvider } from './store/HouseholdContext';

import Page404 from './pages/Page404';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
// import PageDetail from './pages/PageDetail';
import PageProfile from './pages/PageProfile';
import PageHousehold from './pages/PageHousehold';
import PageHome from './pages/PageHome';

function App() {

  const [user, setUser] = useState(null);
  const [household, setHousehold] = useState(null);
  const [isCreatingHousehold, setIsCreatingHousehold] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkAndCreateUser(user, setUser, setHousehold);
        // Ajout de la récupération du foyer
        if (user.householdId) {
          const householdRef = ref(db, 'households/' + user.householdId);
          const snapshot = await get(householdRef);
          if (snapshot.exists()) {
            setHousehold(snapshot.val());
          }
        }
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });
  
    // N'oubliez pas de vous désabonner lors du nettoyage
    return () => unsubscribe();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    handleLogout(setHousehold);
  }

  const navLinkStyle = (isActive) => {
    return {
      fontWeight: isActive ? 'bold' : '400'
    }
  }

  //Ecran de chargement -> A remplacer par un spinner
  if (isLoading) {
    return <div>Chargement...</div>; // Ou autre chose
  }

  return (
    <>
    {/* <HouseholdProvider> */}
    <HouseholdProvider user={user} value={{ household, setHousehold, isCreatingHousehold, setIsCreatingHousehold }}>
      {/* <HouseholdContext.Provider value={{ household, householdId: user?.householdId }}> */}
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
          <Route path="/household" element={user ? <PageHousehold user={user} /> : <PageLogin />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      {/* </HouseholdContext.Provider> */}
      </HouseholdProvider>
    {/* </HouseholdProvider> */}
    </>
  )
}

export default App;
