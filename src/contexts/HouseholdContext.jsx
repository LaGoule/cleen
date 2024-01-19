import React, { createContext, useState, useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import db, { joinHousehold, createAndSetHousehold } from '../providers/firebase-database';

const HouseholdContext = createContext();

export const HouseholdProvider = ({ children, user }) => {
    const [household, setHousehold] = useState({});

    useEffect(() => {
        const fetchHouseholdData = async () => {
            if (!user) {
                return;
            }
            // get userData from database
            const userRef = ref(db, 'users/' + user.uid);
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            if (userData && userData.householdId) {
                const householdRef = ref(db, 'households/' + userData.householdId);
                const snapshot = await get(householdRef);
                if (snapshot.exists()) {
                    setHousehold(snapshot.val());
                } else {
                    // Le foyer n'existe pas dans la base de données, créez-en un
                    await createAndSetHousehold(user, setHousehold);
                }
            } else {
                await createAndSetHousehold(user, setHousehold);
            }
        };
    
        fetchHouseholdData();
    }, [user]);

    const updateHousehold = async (updatedHousehold) => {
        if(!updatedHousehold) {
            setHousehold({});
            return;
        };
        const householdRef = ref(db, 'households/' + updatedHousehold.id);
        await set(householdRef, updatedHousehold);
        setHousehold(updatedHousehold);
        //Ajouter le user dans le foyer
        await joinHousehold(user, updatedHousehold.id);
    };

    return (
        <HouseholdContext.Provider value={{ household, updateHousehold }}>
            {children}
        </HouseholdContext.Provider>
    );
};

export default HouseholdContext;