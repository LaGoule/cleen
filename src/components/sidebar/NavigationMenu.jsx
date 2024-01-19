import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, House, UserCircle, Calendar, SignOut } from "@phosphor-icons/react";

import HouseholdProvider from '../../contexts/HouseholdContext';
import { handleLogout } from '../../providers/firebase-auth';

const NavigationMenu = (props) => {

    const ICON_SIZE = 20;
    const { household, updateHousehold } = useContext(HouseholdProvider);
    const [selectedHousehold, setSelectedHousehold] = useState(household.id);

    const logout = (e) => {
        e.preventDefault();
        handleLogout(updateHousehold);
    }

    const handleHouseholdSelectorChange = (event) => {
        if (event.target.value === "") {
            // TODO: Créer un nouveau foyer
            // TODO: Mettre à jour le contexte
            return;
        }
        // setSelectedHousehold(event.target.value);
        // updateHousehold(event.target.value);
    };

    return (
        <>
            { props.user ?
                <nav>
                    <p>Bienvenue, <span className="username">{props.userData.name ? props.userData.name : 'Anonyme'}</span></p>

                    <select 
                        disabled
                        className="householdSelector" 
                        name="householdSelector" 
                        id="sidebar-householdSelector"
                        value={selectedHousehold}
                        onChange={handleHouseholdSelectorChange}
                    >
                        <option value={household}>{household.name}</option>
                        <option value="">+ Nouveau foyer</option>
                    </select>

                    <ul>
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <CheckCircle size={ICON_SIZE} />
                                    Dashboard</NavLink></li>
                        <li> 
                            <NavLink
                                to="/calendar" 
                                className="disabled-link"
                                // className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <Calendar size={ICON_SIZE} /> 
                                    Calendrier</NavLink></li>
                        <li>
                            <NavLink 
                                to="/household" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <House size={ICON_SIZE} />
                                    Foyer</NavLink></li>
                        <li>
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <UserCircle size={ICON_SIZE} /> 
                                    Profile</NavLink></li>

                        <div className="divider"></div>

                        <li>
                            <a onClick={logout}><SignOut size={ICON_SIZE} /> Déconnexion</a>
                        </li>
                    </ul>
                </nav>
            :
                <>{/* Menu LoggedOut */}</>   
            }
        </>
    );
};

export default NavigationMenu;