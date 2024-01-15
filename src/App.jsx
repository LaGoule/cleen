// App.jsx
import './App.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import auth, { checkAndCreateUser } from './provider/firebase-auth';
import { HouseholdProvider } from './store/HouseholdContext';

// import NavigationMenu from './components/NavigationMenu';
import MainSidebar from './components/MainSidebar';
import Page404 from './pages/Page404';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
import PageProfile from './pages/PageProfile';
import PageHousehold from './pages/PageHousehold';
import PageDashboard from './pages/PageDashboard';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkAndCreateUser(user);
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  
    // N'oubliez pas de vous désabonner lors du nettoyage
    return () => unsubscribe();
  }, []);

  //Ecran de chargement -> A remplacer par un spinner
  if (isLoading) {
    return <div>Chargement...</div>; 
  }

  return ( // refactorer au propre
    <>
    <HouseholdProvider user={user} >
          { user ? 
            <MainSidebar user={user} />
          :
            <></>
          }
          <main>
            <Routes>
              <Route path="/" element={user ? <PageDashboard user={user} /> : <PageLogin />} />
              <Route path="/login" element={<PageLogin />} />
              <Route path="/signup" element={<PageSignup />} />
              <Route path="/home" element={user ? <PageDashboard /> : <PageLogin />} />
              <Route path="/profile" element={user ? <PageProfile user={user} /> : <PageLogin />} />
              <Route path="/household" element={user ? <PageHousehold user={user} /> : <PageLogin />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
      </HouseholdProvider>
    </>
  )
}

export default App;
