import React, { useEffect, useState } from "react";

const ColorPicker = (props) => {

    const colors = [
        { name: "Pas de couleur", value: "#EEE" },
        { name: "Jaune", value: "#FFFEC4" },
        { name: "Vert", value: "#B8F6B5" },
        { name: "Rouge", value: "#FFCACC" },
        { name: "Bleu", value: "#B8D0F6" },
        { name: "Violet", value: "#D0B8F6"}
    ];

    const handleChange = (e) => {
        props.setSelectedColor(e.target.value);
        props.setTask({...props.task, color: e.target.value});
    };

    return (
        <>
            <select 
                onChange={handleChange} 
                value={props.selectedColor} 
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