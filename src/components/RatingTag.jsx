// Rating.jsx
import React from 'react';

const RatingTag = (props) => {

    const starsInNumber = true;
    const hasEmptyStars = true;

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
    return <span className='ratingTag'>{printRating()}</span>;
};

export default RatingTag;