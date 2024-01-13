import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../provider/firebase-auth';
// import Clockwatch from '../components/Clockwatch';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';


const PageHome = () => {
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserLoggedIn(true);
            } else {
                setIsUserLoggedIn(false);
            }
        });
    }, [])

    return (
        <>
            <h1>Todo List</h1>
            {isUserLoggedIn ? <TaskList /> : <Link to="/login">Connectez-vous!</Link>}
            
            {/* <Clockwatch /> */}
            
        </>
    );
}

export default PageHome;