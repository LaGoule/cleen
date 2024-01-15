import React, { /*useState, useEffect, useContext*/ } from 'react';
// import HouseholdContext from '../store/HouseholdContext';
// import { onAuthStateChanged } from 'firebase/auth';
// import auth from '../provider/firebase-auth';
// import Clockwatch from '../components/Clockwatch';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';


const PageDashboard = (props) => {

    const user = props.user;

    return (
        <>
            <div className="card">
                <h2>Liste des tâches</h2>
                <TaskList />
                {/* {user ?  : <Link to="/login">Connectez-vous!</Link>} */}
            </div>
        </>
    );
}

export default PageDashboard;