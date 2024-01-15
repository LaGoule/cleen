import React from 'react';
import { useEffect, useState } from 'react';
import { ref, get, update } from "firebase/database";
import db from '../provider/firebase-database';


const PageProfile = (props) => {

    const [user, setUser] = useState(null);
    const [householdId, setHouseholdId] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewName(user ? user.name : '');
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = ref(db, 'users/' + props.user.uid);
        await update(userRef, { name: newName });
        setUser({ ...user, name: newName });
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = ref(db, 'users/' + props.user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setHouseholdId(snapshot.val().householdId);
                setUser(snapshot.val());
            }
        };

        fetchUserData();
    }, [props.user.uid]);
    
    return (
        <>
            <h2>Profile</h2>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" value={newName} onChange={handleNameChange} /><button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <p>Utilisateur: {user ? user.name : ''}{' '}<button onClick={handleEditClick}>Modifier</button></p>
                </>
            )}

            {/* <p>Id de l'utilisateur: {props.user.uid}</p> */}
            <p>Id du Foyer: {householdId}</p>
        </>
    );
}

export default PageProfile;