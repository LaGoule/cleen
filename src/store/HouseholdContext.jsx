import React, { createContext, useState, useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import db from '../provider/firebase-database';

const HouseholdContext = createContext();


export const HouseholdProvider = ({ children, user }) => {
    const [household, setHousehold] = useState({
    });


    useEffect(() => {
        const fetchHouseholdData = async () => {
            if (user && user.householdId) {
                const householdRef = ref(db, 'households/' + user.householdId);
                const snapshot = await get(householdRef);
                if (snapshot.exists()) {
                    setHousehold(snapshot.val());
                }
            }
        };
    
        fetchHouseholdData();
    }, [user]);

    const updateHousehold = async (updatedHousehold) => {
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