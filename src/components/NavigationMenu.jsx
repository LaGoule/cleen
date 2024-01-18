import React, { useContext, useState } from 'react';
import { handleLogout } from '../provider/firebase-auth';
import { NavLink } from 'react-router-dom';
import HouseholdProvider from '../store/HouseholdContext';
import { CheckCircle, House, UserCircle, Calendar, SignOut } from "@phosphor-icons/react";

const NavigationMenu = (props) => {

    const iconSize = 20;
    const { household, updateHousehold } = useContext(HouseholdProvider);
    const [selectedHousehold, setSelectedHousehold] = useState(household.id);


    const logout = (e) => {
        e.preventDefault();
        handleLogout(updateHousehold);
    }

    const handleChange = (event) => {
        if (event.target.value === "") {
            // TODO: Créer un nouveau foyer
            // TODO: Mettre à jour le contexte
            return;
        }
        console.log(event.target.value, household);
        setSelectedHousehold(event.target.value);
        updateHousehold(event.target.value);
    };

    return (
        <>
            { props.user ?
                <nav>
                    <p>Bienvenue, <span className="username">{props.userData.name ? props.userData.name : 'Anonyme'}</span></p>

                    <select 
                        className="householdSelector" 
                        name="householdSelector" 
                        id="sidebar-householdSelector"
                        value={selectedHousehold}
                        onChange={handleChange}
                    >
                        <option value={household}>{household.name}</option>
                        <option value="">+ Nouveau foyer</option>
                    </select>

                    <ul>
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <CheckCircle size={iconSize} />
                                    Dashboard</NavLink></li>
                        <li>
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <UserCircle size={iconSize} /> 
                                    Profile</NavLink></li>
                        <li>
                            <NavLink 
                                to="/household" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <House size={iconSize} />
                                    Foyer</NavLink></li>
                        <li> 
                            <NavLink
                                to="/calendar" 
                                className="disabled-link"
                                // className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <Calendar size={iconSize} /> 
                                    Calendrier</NavLink></li>

                        <div className="divider"></div>

                        <li>
                            <a 
                                onClick={logout}>
                                    <SignOut size={iconSize} />
                                    Déconnexion</a></li>
                    </ul>
                </nav>
            :
                <>
                    {/* Menu LoggedOut */}
                </>   
            }
        </>
    );
};

export default NavigationMenu;