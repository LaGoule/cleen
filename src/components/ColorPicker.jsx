import React, { useState } from "react";

const ColorPicker = (props) => {

    const colors = [
        { name: "Pas de couleur", value: "#fff" },
        { name: "Jaune", value: "#f9f147" },
        { name: "Vert", value: "#42E2B8" },
        { name: "Rouge", value: "#fc868e" },
        { name: "Bleu", value: "#3dadf2" },
        { name: "Violet", value: "#d8aeed"}
    ];

    const handleChange = (e) => {
        props.setTask({...props.task, color: e.target.value})
    };

    return (
        <>
            <select 
                onChange={handleChange} 
                value={props.task.color} 
                name="colorSelector" 
                className="colorSelector"
            >
                {colors.map((color) => (
                    <option 
                        key={color.name}
                        value={color.value}>
                            {color.name}
                    </option>
                ))}
            </select>
        </>
    );
}

export default ColorPicker;