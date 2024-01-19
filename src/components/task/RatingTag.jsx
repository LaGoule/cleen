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
    const styles = animate && !props.task.checked.status ? {
            backgroundColor: medalColors[props.task.rating-1],
            backgroundImage: `linear-gradient(135deg, 
                ${medalColors[props.task.rating-1]} 0%, 
                ${medalColors[props.task.rating-1]} 20%, 
                rgba(255, 255, 255, 0.1) 21%, 
                rgba(255, 255, 255, 0.9) 23%, 
                ${medalColors[props.task.rating-1]} 40%, 
                ${medalColors[props.task.rating-1]} 100%)`,
            backgroundSize: '200% 100%',
            backgroundPosition: '0 0',
            animation: props.isEditing || props.task.checked.status ? 'none' : `shine 3s infinite ease-in`,
        } : {
            backgroundColor: medalColors[props.task.rating-1],
            backgroundImage: 'none',
            animation: 'none',
        }

    const printRating = () => {
        let stars = '';

        if(starsInNumber) {
            stars = '★ × ' + props.task.rating
        } else {
            for (let i = 0; i < props.task.rating; i++) {
                stars += '★';
            }
            if (hasEmptyStars) {
                for (let i = props.task.rating; i < 3; i++) {
                    stars += '☆';
                }
            }
        }
        return stars;
    }


    //Ajouter un ecouteur sur isEditing pour arrêter l'animation quand on est en mode édition
    useEffect(() => {
        props.isEditing || props.task.checked.status ?
            animate = false :
            animate = true;
    }, [props.isEditing, props.task.checked.status]);
    


    return (
        <span className='ratingTag' style={styles}>{printRating()}</span>
    );
};

export default RatingTag;