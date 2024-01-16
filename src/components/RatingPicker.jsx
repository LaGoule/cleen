import React, { useState } from "react";

const RatingPicker = (props) => {
    const maxRatings = [3];

    const handleChange = (e) => {
        props.setTask({...props.task, rating: e.target.value})
    };

    return (
        <select 
            onChange={handleChange} 
            value={props.task.rating} 
            name="ratingSelector" 
            className="ratingSelector"
        >
            {
                Array.from({ length: maxRatings }, (_, i) => i + 1).map(rating => (
                    <option key={rating} value={rating}>
                        {"⭑".repeat(rating)}
                    </option>
                ))
            }
        </select>
    );
}

export default RatingPicker;