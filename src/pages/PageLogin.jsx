import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import auth, { handleLogin, handlePasswordReset } from '../provider/firebase-auth';
import { NavLink, useNavigate } from 'react-router-dom'

const PageLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Récupérez l'email du localStorage lorsque le composant est monté
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) setEmail(savedEmail);
    }, []);
       
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, password);
            navigate('/');
        } catch (error) {
            console.error("Error signing in", error);
        }
    }
    
    return (
        <>
            <h2>Connexion requise</h2>
            {/* <p>Veuillez vous connectez.</p> */}

            <form>                                              
                <div>
                    <label htmlFor="email-address">
                        Adresse email
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"  
                        value={email} 
                        required                                                                                
                        placeholder="Adresse email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"    
                        value={password} 
                        required                                                                                
                        placeholder="Mot de passe"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div><br/>
                                
                <div>
                    <button                                    
                        onClick={onLogin}                                        
                    >      
                        Connexion                                                                 
                    </button>
                </div>                               
            </form>
        
            <p>
                Pas encore de compte? {' '}
                <NavLink to="/signup">
                    Créer un compte
                </NavLink><br/>
                <a onClick={handlePasswordReset}>
                    Mot de passe oublié?
                </a>
            </p>

        </>
    );
}

export default PageLogin;