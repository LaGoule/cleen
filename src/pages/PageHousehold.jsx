import React, { useContext, useState } from 'react';
import { ref, set, get } from 'firebase/database';
import db from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext';

const PageHousehold = (props) => {

    const { household, updateHousehold } = useContext(HouseholdContext);
    const [householdName, setHouseholdName] = useState('');
    const [householdId, setHouseholdId] = useState('');

    const handleHouseholdNameChange = (event) => {
        setHouseholdName(event.target.value);
    };

    const handleHouseholdNameSubmit = async (event) => {
        event.preventDefault();
        await set(ref(db, 'households/' + household.uid + '/name'), householdName);
        updateHousehold({ ...household, name: householdName });
        setHouseholdName('');
    };

    const handleHouseholdIdChange = (event) => {
        setHouseholdId(event.target.value);
    };

    const handleHouseholdIdSubmit = async (event) => {
        event.preventDefault();
        // référence du parametre foyer pour l'utilisateur
        const householdRef = ref(db, 'users/' + props.user.uid + '/householdId');
        // set du nouveau foyer pour l'utilisateur
        await set(householdRef, householdId);    
        
        // Récupérer les nouvelles données du foyer
        const newHouseholdRef = ref(db, 'households/' + householdId);
        const newHouseholdSnapshot = await get(newHouseholdRef);
        const newHouseholdData = newHouseholdSnapshot.val();

        // Mettre à jour l'état local
        updateHousehold(newHouseholdData);

        setHouseholdId('');
    };

    return (
        <>
            <h2>Foyer</h2>

            <p>Nom du foyer : {household?.name}</p>
            <form onSubmit={handleHouseholdNameSubmit}>
                <input type="text" value={householdName} onChange={handleHouseholdNameChange} placeholder="Nouveau nom" />
                <button type="submit">Modifier le nom</button>
            </form>

            <p>Id du foyer : {household?.uid}</p>
            <form onSubmit={handleHouseholdIdSubmit}>
                <input type="text" value={householdId} onChange={handleHouseholdIdChange} placeholder="Code du foyer" />
                <button type="submit">Rejoindre un foyer</button>
            </form>
            <p>Utilisateurs : {JSON.stringify(household?.users)}</p>
        </>
    );
}

export default PageHousehold;