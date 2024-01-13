import React, { useContext } from 'react';
import HouseholdContext from '../store/HouseholdContext';

const PageHousehold = (props) => {

    const { household } = useContext(HouseholdContext);


    return (
        <>
            <h2>Foyer</h2>

            <p>Nom du foyer : {household?.name}</p>
            <p>Id du foyer : {household?.uid}</p>
            <p>Utilisateurs : {JSON.stringify(household?.users)}</p>
        </>
    );
}

export default PageHousehold;