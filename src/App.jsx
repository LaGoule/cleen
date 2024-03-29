// App.jsx
import './App.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import auth, { checkAndCreateUser } from './providers/firebase-auth';
import { HouseholdProvider } from './contexts/HouseholdContext';

import LoadingSpinner from './components/LoadingSpinner';
import Sidebar from './components/sidebar/Sidebar';

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

  //Ecran de chargement 
  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <HouseholdProvider user={user} >
      { user ? 
        <Sidebar user={user} />
        : <></>
      }
      <main>
        <Routes>
          <Route path="/signup" element={<PageSignup />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/" element={user ? <PageDashboard user={user} /> : <PageLogin />} />
          <Route path="/home" element={user ? <PageDashboard user={user} /> : <PageLogin />} />
          <Route path="/profile" element={user ? <PageProfile user={user} /> : <PageLogin />} />
          <Route path="/household" element={user ? <PageHousehold user={user} /> : <PageLogin />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </HouseholdProvider>
  )
}

export default App;
