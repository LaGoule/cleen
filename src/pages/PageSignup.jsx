import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../providers/firebase-auth';

const PageSignup = () => {const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
        })
        .catch((error) => {
            console.log(error.code, error.message);
            // TODO: Switch Handle Errors here.
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email déjà utilisé');
                    break;
                case 'auth/invalid-email':
                    alert('Email invalide');
                    break;
                case 'auth/weak-password':
                    alert('Mot de passe faible');
                    break;
                default:
                    alert('Erreur inconnue');
            }
        });
    }

    return (
        <>
        <div id="signupPage">
            <div className='card'>
                <h2>Créer un compte.</h2>
                {/* <p>Créer un compte.</p> */}

                <form>                                                                                            
                    <div>
                        <label htmlFor="email-address">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            label="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Adresse email"                                
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Mot de passe"              
                        />
                    </div>                                     
                    <div>
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Créer un compte                  
                        </button>     
                    </div>  
                </form>
                    
                <p>
                    Vous possedez déjà un compte?<br/>
                    <NavLink to="/login" >
                        Se connecter
                    </NavLink>
                </p>     
            </div>
        </div>
        </>
    );
}

export default PageSignup;