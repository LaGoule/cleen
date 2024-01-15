import React from "react";
import NavigationMenu from "./NavigationMenu";

const MainSidebar = (props) => {


    return (
        <>
            <aside>
                <header>
                    <h1>Cleen</h1>
                    <NavigationMenu user={props.user} />
                </header>
            </aside>
        </>
    )
}

export default MainSidebar;