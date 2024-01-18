import React, { useContext, useState, useEffect } from 'react';
import { ref, set, onValue, off, get } from 'firebase/database';
import db from '../provider/firebase-database';
import HouseholdContext from '../store/HouseholdContext';
import CodeSharer from '../components/CodeSharer';
import { House, CaretRight, User } from '@phosphor-icons/react';

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
        setUsersData([]);
        const callbacks = [];
    
        if (household.users) {
            const userRefs = Object.keys(household.users)
                .filter(userId => household.users[userId])
                .map(userId => ref(db, 'users/' + userId));
    
            userRefs.forEach(userRef => {
                const callback = snapshot => {
                    const data = snapshot.val();
                    setUsersData(users => [...users, { 
                        uid: snapshot.key, 
                        name: data.name, 
                        email: data.email }]);
                };
    
                onValue(userRef, callback);
                callbacks.push({ ref: userRef, callback });
            });
        }
    
        return () => {
            callbacks.forEach(({ ref, callback }) => off(ref, 'value', callback));
        };
    }, [household.users]);

    useEffect(() => {
        // Assurez-vous que household.id est défini avant de créer la référence
        if (household.id) {
            const tasksRef = ref(db, 'tasks/' + household.id);
            
            // Écoutez les modifications des tâches
            onValue(tasksRef, (snapshot) => {
              setTasks(snapshot.val());
            });
        }
    }, [household.id]); // Ajoutez household.id comme dépendance pour que l'effet se déclenche à chaque fois que l'id du foyer change

    return (
        <>
        <div id="householdPage">
            <div className="card householdCard">
                <h2>{household?.name}</h2>

                <form >
                    <div>
                    <label htmlFor="householdName">Modifier le nom du foyer</label>
                    <input name="householdName" type="text" value={householdName} onChange={handleHouseholdNameChange} placeholder="Nouveau nom" style={{width:'calc(100% - 20px)'}} />

                    </div>
                    <button onClick={handleHouseholdNameSubmit} type="submit"
                        style={{marginBottom: '20px'}}
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
                ><hr/>Ou<hr/></div>
                <div>

                <label htmlFor="codeShareIn">Rejoindre un foyer</label>
                <input id="codeShareIn" className="householdCode"  placeholder='Entrer un code'
                    type="text" value={householdId} onChange={handleHouseholdIdChange}/>
                </div>
                <button type="submit"
                    onClick={handleHouseholdIdSubmit}
                >Rejoindre</button>

            </div>

            {usersData ?
                <div className="card membersCard">
                    <h2>Liste des membres</h2>
                    <ul className="memberList">


                    
                    { // Un gros caca-boudin
                    usersData && tasks ? (
                        usersData.map((user, index) => {
                        Object.values(tasks).forEach(task => {
                            console.log('Task:', task);
                            if (task && task.checked !== undefined) {
                                
                            //   console.log('Task checked:', task.checked);
                            }
                        });

                        const userTasks = Object.values(tasks).filter(
                            (task) =>
                            task &&
                            task.checked !== undefined &&
                            task.checked.status &&
                            task.checked.user !== undefined &&
                            task.checked.user === user.uid
                        );
                        //   console.log('User tasks:', userTasks);

                        const ratingSum = userTasks.reduce((acc, task) => acc + +task.rating, 0);

                        return (
                            <li key={index} className='memberCard'>
                            <div id={user.uid} className="avatar mini"></div>
                            {user.name}
                            <p className="ratingTag"
                                style={{ 
                                    // backgroundColor: 'rgb(255, 215, 0)',
                                    // color: 'white',
                                    // margin: '0 0 0 auto',
                                    // padding: '0 4px',
                                    // borderRadius: '4px',
                                    // fontWeight: '600',
                                    // fontSize: '.9em',
                                    // opacity: '0.9',
                                    // boxShadow: '1px 1px 1px 0px rgba(0,0,0,.3)'
                                    color: 'rgb(255, 215, 0)',
                                    margin: '0 0 0 auto',
                                }}
                            >★ × {ratingSum}</p>
                            <User size={18} color="#646cff" weight="bold" />
                            </li>
                        );
                        })
                    ) : null
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