// SearchFilter.jsx
import React from 'react';

const SearchFilter = (props) => (
    <div className="formGroup">
        <input
            placeholder='Rechercher'
            value={props.filter} 
            onChange={(e) => props.setFilter(e.target.value)}
        />
        
        <select 
            value={props.sort} 
            onChange={(e) => props.setSort(e.target.value)}
        >
            <option value="">--Choisissez un filtre--</option>
            <option value="added">Par ordre d'ajout</option>
            <option value="alphabetical">Par ordre alphabétique</option>
        </select>
    </div>
);

export default SearchFilter;