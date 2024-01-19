import React from "react";
import { MagnifyingGlass } from '@phosphor-icons/react';

const Searchfield = (props) => {
    return (
        <label className='hasIconRight searchBar' htmlFor="searchBar">
            <input
                id="searchBar"
                placeholder='Rechercher'
                value={props.filter} 
                onChange={(e) => props.setFilter(e.target.value)}
            />
            <MagnifyingGlass size={20} weight='bold' />
        </label>
    )
}

export default Searchfield;