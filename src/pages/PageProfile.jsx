import React from 'react';

const PageProfile = (props) => {

    let username = '';
    props.user.displayName ? username = props.user.displayName : username = 'Utilisateur';
    
    return (
        <>
            <h2>Profile</h2>

            <p>{username}</p>
        </>
    );
}

export default PageProfile;