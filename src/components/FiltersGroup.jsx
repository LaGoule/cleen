import React from 'react';
import Searchfield from './ui/Searchfield';
import OrderBySelector from './ui/OrderBySelector';

const FiltersGroup = (props) => (
    <form>
        <Searchfield filter={props.filter} setFilter={props.setFilter} />
        <OrderBySelector sort={props.sort} setSort={props.setSort} />
    </form>
);

export default FiltersGroup;