import React from 'react';
import { useParams } from 'react-router-dom';

const PageDetail = () => {

    const { id } = useParams();
    
    return (
        <>
            <h2>Ma page: {id}</h2>
        </>
    );
}

export default PageDetail;