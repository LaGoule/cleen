// App.jsx
import './App.css'
import React, {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route, Link, Navigate, NavLink, useParams } from 'react-router-dom';
//import database from './provider/firebase-database';

import Page404 from './pages/Page404';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
import PageDetail from './pages/PageDetail';
import PageProfile from './pages/PageProfile';
import PageTodoList from './pages/PageTodoList';

function App() {

  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  const navLinkStyle = (isActive) => {
    return {
      fontWeight: isActive ? 'bold' : '400'
    }
  }

  // const exempleGroupId = '0A1B2C3D4E5F6G7H8I9J'

  return (
    <>

      <BrowserRouter>
        <header>
          <h1>Cleen</h1>
          <nav>
            <ul>
              <li><NavLink to="/home" style={({ isActive }) => (navLinkStyle(isActive))}>Home</NavLink></li>
              <li><NavLink to="/profile" style={({ isActive }) => (navLinkStyle(isActive))}>Profile</NavLink></li>
              <li><NavLink to="/profile/Damien" style={({ isActive }) => (navLinkStyle(isActive))}>Damien</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/home" element={<PageTodoList />} />
          <Route path="/profile" element={<PageProfile />} />
          <Route path="/profile/:id" element={<PageDetail />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
