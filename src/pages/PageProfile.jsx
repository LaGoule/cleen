import React from 'react';
import { useEffect, useState } from 'react';
import { ref, get } from "firebase/database";
import db from '../provider/firebase-database';


const PageProfile = (props) => {

    const [householdId, setHouseholdId] = useState(null);
    let username = props.user.displayName ? props.user.displayName : 'Annonyme';

    useEffect(() => {
        const userRef = ref(db, 'users/' + props.user.uid);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                setHouseholdId(snapshot.val().householdId);
            }
        });
    }, [props.user.uid]);
    
    return (
        <>
            <h2>Profile</h2>

            <p>Utilisateur: {username}</p>
            <p>Id de l'utilisateur: {props.user.uid}</p>
            <p>Id du Foyer: {householdId}</p>
        </>
    );
}

export default PageProfile;