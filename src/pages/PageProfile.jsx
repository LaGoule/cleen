import React, { useContext, useEffect, useState } from 'react';
import { onValue, ref, update } from "firebase/database";
import db from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext';


const PageProfile = (props) => {

    const [user, setUser] = useState(null);
    const { household } = useContext(HouseholdContext);

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
        const userRef = ref(db, 'users/' + props.user.uid);
    
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUser(data);
        }, {
            onlyOnce: true,
        });
    
        // Nettoyer l'abonnement lors du démontage du composant
        return () => unsubscribe();
    }, [db, props.user.uid]);
    
    return (
        <>
            <div className="card">
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

                <p>Adresse e-mail: {props.user.email}</p>
                {/* <p>Id du Foyer: {householdId}</p> */}
                <p>Nom du foyer: {household.name}</p>
            </div>
        </>
    );
}

export default PageProfile;