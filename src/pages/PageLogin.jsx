import React, { useState, useEffect } from 'react';
// import { signInWithEmailAndPassword  } from 'firebase/auth';
import auth, { handleLogin, handleGoogleLogin, handlePasswordReset } from '../providers/firebase-auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { GoogleLogo } from '@phosphor-icons/react';


const PageLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Récupérez l'email du localStorage lorsque le composant est monté
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) setEmail(savedEmail);
        // Récupérez le mot de passe du localStorage lorsque le composant est monté
        const savedPassword = localStorage.getItem('password');
        if (savedPassword) setPassword(savedPassword);
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
    
    const onGoogleLogin = async () => {
        try {
            await handleGoogleLogin();
            navigate('/');
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    }
    
    return (
        <>
        <div id="loginPage">
            <div className="card">
                <h2>Connexion requise</h2>

                <button 
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}
                    className="googleButton" onClick={onGoogleLogin}>Se connecter avec Google
                    <GoogleLogo size={24} weight="fill" />
                </button>

                <div
                    style={{
                        color: '#ccc',
                        fontSize: '0.7em',
                        textTransform: 'uppercase',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: '10px',
                        margin: '10px 0'
                    }}
                ><hr/>Ou<hr/></div>

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
                    </div>     
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
            </div>
        </div>
        </>
    );
}

export default PageLogin;