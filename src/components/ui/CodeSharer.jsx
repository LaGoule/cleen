// Clockwatch.jsx
import React from 'react';

const CodeSharer = (props) => {
    const handleMouseDown = async (e) => {
        e.target.select();
        try {
            await navigator.clipboard.writeText(props.household.id);
            // e.target.innerHTML = 'Code copié !'
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <>
            { 
                props.household ?
                    <>
                    <div>

                        <label htmlFor="codeShareOut">Partage votre foyer</label>
                        <input 
                            id="codeShareOut" 
                            className="householdCode" 
                            value={props.household ? props.household.id : ""}
                            type="text" 
                            readOnly
                            onMouseDown={handleMouseDown}
                        />
                    </div>
                    </>
                :
                    <p>Chargement...</p>
            }
        </>
    );
};

export default CodeSharer;