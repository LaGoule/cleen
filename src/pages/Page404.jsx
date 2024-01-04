import React from 'react';

const Page404 = () => {
    
    return (
        <>
            <h2>Page introuvable...</h2>
            <p>La page que vous recherchez n'existe pas.</p>

            <button onClick={() => window.history.back()}>Retour</button>
        </>
    );
}

export default Page404;