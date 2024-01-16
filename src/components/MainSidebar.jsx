import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import db from '../provider/firebase-database';
import { ref, onValue, off } from 'firebase/database';
import { Broom, PaintBrushHousehold } from "@phosphor-icons/react";

const MainSidebar = (props) => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const userRef = ref(db, 'users/' + props.user.uid);
        const fetchUser = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        });
        return () => {
            off(userRef, 'value', fetchUser);
        }
    }, [props.user.uid]);

    return (
        <>
            <aside>
                <header>
                    <h1 id="main-logo"><Link to="/"><Broom className="broom-logo" size={20} weight="fill"/>Cleen</Link></h1>
                    <NavigationMenu user={props.user} userData={userData} />
                </header>
            </aside>
        </>
    )
}

export default MainSidebar;