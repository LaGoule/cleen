// App.jsx
import './App.css'
import React, {useState, useEffect, useCallback} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth, { handleLogout } from './provider/firebase-auth';

import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import Page404 from './pages/Page404';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
import PageDetail from './pages/PageDetail';
import PageProfile from './pages/PageProfile';
import PageHome from './pages/PageHome';

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }
    );
  }, [])

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
  }

  const navLinkStyle = (isActive) => {
    return {
      fontWeight: isActive ? 'bold' : '400'
    }
  }

  // const exempleGroupId = '0A1B2C3D4E5F6G7H8I9J'

  return (
    <>
        <header>
          <h1>Cleen</h1>

          { user ?
            <nav>
              <ul>
                  <>
                    <li><NavLink to="/home" style={({ isActive }) => (navLinkStyle(isActive))}>Home</NavLink></li>
                    <li><NavLink to="/profile" style={({ isActive }) => (navLinkStyle(isActive))}>
                      {user.displayName ? user.displayName : "Profile"}  
                    </NavLink></li>
                    <li><a onClick={logout}>Déconnexion</a></li>
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
          <Route path="/profile" element={user ? <PageProfile /> : <PageLogin />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </>
  )
}

export default App;
