// Clockwatch.jsx
import React, { useState, useEffect } from 'react';

const Clockwatch = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    //Console Log de la date à chaque changement de state
    // useEffect(() => {
    //     console.log(time.toLocaleTimeString());
    // }, [time]);

    return (
        <h3 className="clockwatch">
            {time.toLocaleTimeString()}
        </h3>
    );
};

export default Clockwatch;