import React from "react";

const OrderBySelector = (props) => {
    return (
        <select 
            value={props.sort} 
            onChange={(e) => props.setSort(e.target.value)}
        >
            <option defaultValue 
                    value="newest">Les plus récentes</option>
            <option value="oldest">Les plus anciennes</option>
            {/* <option value="alphabetical">Trier par ordre alphabétique</option> */}
            <option value="rating">Trier par nombre d'étoiles</option>
            <option value="color">Trier par couleurs</option>
            <option value="random">Ordre aléatoire</option>
        </select>
    )
};

export default OrderBySelector;