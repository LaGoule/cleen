import React, { useContext } from 'react';
import { handleLogout } from '../provider/firebase-auth';
import { NavLink } from 'react-router-dom';
import HouseholdProvider from '../store/HouseholdContext';
import { CheckCircle, House, UserCircle, SignOut } from "@phosphor-icons/react";

const NavigationMenu = (props) => {

    const iconSize = 20;
    const { updateHousehold } = useContext(HouseholdProvider);

    const logout = (e) => {
        e.preventDefault();
        handleLogout(updateHousehold);
    }

    return (
        <>
            { props.user ?
                <nav>
                    {/* <p>Bienvenue <span className="username">{props.userData.name ? props.userData.name : 'Anonyme'}</span></p> */}

                    <select className="householdSelector" name="" id="">
                        <option value="">Maison de Léo</option>
                        <option value=""></option>
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
                                to="/household" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <House size={iconSize} />
                                    Foyer</NavLink></li>
                        <li>
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <UserCircle size={iconSize} /> 
                                    Profile</NavLink></li>
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