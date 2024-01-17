// Rating.jsx
import React, { useEffect } from 'react';

const RatingTag = (props) => {

    let animate = true;
    const starsInNumber = true;
    const hasEmptyStars = true;
    const medalColors = [
        '#f6b58d', // Bronze
        '#b8d0f6', // Silver
        '#ffd700', // Gold
    ];
    const styles = animate ? {
            backgroundColor: medalColors[props.rating-1],
            backgroundImage: `linear-gradient(135deg, 
                ${medalColors[props.rating-1]} 0%, 
                ${medalColors[props.rating-1]} 20%, 
                rgba(255, 255, 255, 0.1) 21%, 
                rgba(255, 255, 255, 0.9) 23%, 
                ${medalColors[props.rating-1]} 40%, 
                ${medalColors[props.rating-1]} 100%)`,
            backgroundSize: '200% 100%',
            backgroundPosition: '0 0',
            animation: props.isEditing ? 'none' : `shine 5s infinite ease-in`,

        } : {
            background: medalColors[props.rating-1],
        }

    const printRating = () => {
        let stars = '';

        if(starsInNumber) {
            stars = '★ × ' + props.rating
        } else {
            for (let i = 0; i < props.rating; i++) {
                stars += '★';
            }
            if (hasEmptyStars) {
                for (let i = props.rating; i < 3; i++) {
                    stars += '☆';
                }
            }
        }
        return stars;
    }


    //Ajouter un ecouteur sur isEditing pour arrêter l'animation quand on est en mode édition
    useEffect(() => {
        props.isEditing ?
            animate = false :
            animate = true;
    }, [props.isEditing]);
    


    return (
        <span className='ratingTag' style={styles}>{printRating()}</span>
    );
};

export default RatingTag;