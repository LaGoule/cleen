import React, { useContext } from 'react';
import { handleLogout } from '../provider/firebase-auth';
import { NavLink } from 'react-router-dom';
import HouseholdProvider from '../store/HouseholdContext';

const NavigationMenu = (props) => {

    const { updateHousehold } = useContext(HouseholdProvider);

    const logout = (e) => {
        e.preventDefault();
        handleLogout(updateHousehold);
    }

    const navLinkStyle = (isActive) => {
        return {
            fontWeight: isActive ? 'bold' : '400',
        }
    }

    return (
        <>
            { props.user ?
                <nav>
                <ul>
                    <>
                    <li><b></b><NavLink to="/" style={({ isActive }) => (navLinkStyle(isActive))}>Dashboard</NavLink></li>
                    <li><b></b><NavLink to="/household" style={({ isActive }) => (navLinkStyle(isActive))}>Foyer</NavLink></li>
                    <li><b></b><NavLink to="/profile" style={({ isActive }) => (navLinkStyle(isActive))}>Profile</NavLink></li>
                    <div className="divider"></div>
                    <li><b></b><a onClick={logout}
                    >Déconnexion</a></li>
                    </>
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