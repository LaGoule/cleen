import React, { createContext, useState, useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import db, { checkAndSetHousehold, createAndSetHousehold } from '../provider/firebase-database';

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
        const householdRef = ref(db, 'households/' + updatedHousehold.uid);
        await set(householdRef, updatedHousehold);
        setHousehold(updatedHousehold);
    };

    return (
        <HouseholdContext.Provider value={{ household, updateHousehold }}>
            {children}
        </HouseholdContext.Provider>
    );
};

export default HouseholdContext;