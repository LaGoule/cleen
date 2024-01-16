// SearchFilter.jsx
import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const SearchFilter = (props) => (
    <div className="formGroup">

        <label className='hasIconRight searchBar' htmlFor="searchBar">
            <input
                placeholder='Rechercher'
                value={props.filter} 
                onChange={(e) => props.setFilter(e.target.value)}
            />
            <MagnifyingGlass size={20} weight='bold' />
        </label>
        
        <select 
            value={props.sort} 
            onChange={(e) => props.setSort(e.target.value)}
        >
            {/* <option value="">--Choisissez un filtre--</option> */}
            <option defaultValue value="added">Par ordre d'ajout</option>
            <option value="alphabetical">Par ordre alphabétique</option>
            <option value="rating">Par nombre d'étoiles</option>
        </select>
    </div>
);

export default SearchFilter;