// SearchFilter.jsx
import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const SearchFilter = (props) => (
    <form>
        <label className='hasIconRight searchBar' htmlFor="searchBar">
            <input
                id="searchBar"
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

            {/* ajoute fdp les plus recentes les pu ancien */}
            <option defaultValue value="added">Les plus anciennes</option>
            <option value="alphabetical">Trier par ordre alphabétique</option>
            <option value="rating">Trier par nombre d'étoiles</option>
            <option value="color">Trier par couleurs</option>
            <option value="random">Ordre aléatoire</option>
        </select>
    </form>
);

export default SearchFilter;