// Refactorer proprement cette page pour qu'elle soit plus lisible et plus facile à maintenir
import React, { useContext, useState, useEffect } from 'react';
import { ref, set, onValue, off, get } from 'firebase/database';
import db from '../providers/firebase-database';
import HouseholdContext from '../contexts/HouseholdContext';
import CodeSharer from '../components/ui/CodeSharer';
import { CaretRight, User } from '@phosphor-icons/react';

const PageHousehold = (props) => {

    const { household, updateHousehold } = useContext(HouseholdContext);
    const [householdName, setHouseholdName] = useState('');
    const [householdId, setHouseholdId] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [tasks, setTasks] = useState({});

    const handleHouseholdNameChange = (event) => {
        setHouseholdName(event.target.value);
    };

    const handleHouseholdNameSubmit = async (event) => {
        event.preventDefault();
        if (householdName === '') {
            return;
        }
        await set(ref(db, 'households/' + household.id + '/name'), householdName);
        updateHousehold({ ...household, name: householdName });
        setHouseholdName('');
    };

    const handleHouseholdIdChange = (event) => {
        setHouseholdId(event.target.value);
    };

    const handleHouseholdIdSubmit = async (event) => {
        event.preventDefault();
        // référence du parametre foyer pour l'utilisateur
        const householdRef = ref(db, 'users/' + props.user.uid + '/householdId');
        // set du nouveau foyer pour l'utilisateur
        await set(householdRef, householdId);

        // Récupérer les nouvelles données du foyer
        const newHouseholdRef = ref(db, 'households/' + householdId);
        const newHouseholdSnapshot = await get(newHouseholdRef);
        const newHouseholdData = newHouseholdSnapshot.val();

        // Mettre à jour l'état local
        updateHousehold(newHouseholdData);
        setHouseholdId('');
    };    
    
    useEffect(() => {
        // Assurez-vous que household.id est défini avant de créer la référence
        if (household.id) {
            const tasksRef = ref(db, 'tasks/' + household.id);

            // Écoutez les modifications des tâches
            onValue(tasksRef, (snapshot) => {
                setTasks(snapshot.val());
            });
        }
    }, [household.id]);

    useEffect(() => {
        // Vérifiez si le foyer a des utilisateurs
        if (household && household.users) {
            // Obtenez les IDs des utilisateurs du foyer
            const userIds = Object.keys(household.users);
    
            // Créez des références à chaque utilisateur dans la base de données
            const userRefs = userIds.map(userId => ref(db, 'users/' + userId));
            // Créez un tableau pour stocker les promesses de récupération des données des utilisateurs
            const userPromises = userRefs.map(userRef => get(userRef));
    
            // Attendez que toutes les données des utilisateurs soient récupérées
            Promise.all(userPromises)
                .then(snapshots => {
                    // Créez un tableau temporaire pour stocker les données des utilisateurs
                    const tempUsersData = [];
    
                    // Pour chaque snapshot...
                    snapshots.forEach(snapshot => {
                        // Si l'utilisateur existe...
                        if (snapshot.exists()) {
                            // ...récupérez ses données
                            const data = snapshot.val();
    
                            // ...et ajoutez les données de l'utilisateur au tableau temporaire
                            tempUsersData.push({
                                uid: snapshot.key,
                                name: data.name,
                                email: data.email,
                                photoURL: data.photoURL
                            });
                        }
                    });
    
                    // Mettez à jour l'état des données des utilisateurs avec le tableau temporaire
                    setUsersData(tempUsersData);
                })
                .catch((error) => {
                    // En cas d'erreur, affichez l'erreur dans la console
                    console.error(error);
                });
        }
    }, [household, db]); // Exécutez cet effet chaque fois que le foyer ou la base de données change




    return (
        <>
            <div id="householdPage">
                <div className="card householdCard">
                    <h2>{household?.name}</h2>

                    <form >
                        <div>
                            <label htmlFor="householdName">Modifier le nom du foyer</label>
                            <input name="householdName" type="text" value={householdName} onChange={handleHouseholdNameChange} placeholder="Nouveau nom" style={{ width: 'calc(100% - 20px)' }} />

                        </div>
                        <button onClick={handleHouseholdNameSubmit} type="submit"
                            style={{ marginBottom: '20px' }}
                        >Modifier le nom</button>
                    </form>

                    <CodeSharer household={household} />

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
                    ><hr />Ou<hr /></div>
                    <div>

                        <label htmlFor="codeShareIn">Rejoindre un foyer</label>
                        <input id="codeShareIn" className="householdCode" placeholder='Entrer un code'
                            type="text" value={householdId} onChange={handleHouseholdIdChange} />
                    </div>
                    <button type="submit"
                        onClick={handleHouseholdIdSubmit}
                    >Rejoindre</button>

                </div>

                {usersData ?
                    <div className="card membersCard">
                        <h2>Liste des membres</h2>
                        <ul className="memberList">

                        {
                            usersData ? (
                                usersData.map((user, index) => {
                                    const userTasks = tasks ? Object.values(tasks).filter(
                                        (task) =>
                                            task &&
                                            task.checked !== undefined &&
                                            task.checked.status &&
                                            task.checked.user !== undefined &&
                                            task.checked.user === user.uid
                                    ) : [];

                                    const ratingSum = userTasks.reduce((acc, task) => acc + +task.rating, 0);

                                    return (
                                        <li key={index} className='memberCard'>
                                            <div id={user.uid} className="avatar mini"></div>
                                            {user.name}
                                            <p className="ratingTag"
                                                style={{
                                                    color: 'rgb(255, 215, 0)',
                                                    margin: '0 0 0 auto',
                                                }}
                                                >★ × {ratingSum}</p>
                                                <User size={18} color="#646cff" weight="bold" />
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p>Il n'y a pas d'utilisateurs...</p>
                                )
                            }


                        </ul>
                    </div>
                    :
                    <></>
                }
            </div>
        </>
    );
}

export default PageHousehold;