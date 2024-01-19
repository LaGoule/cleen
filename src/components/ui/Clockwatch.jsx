// Clockwatch.jsx
import React, { useState, useEffect } from 'react';

const Clockwatch = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return _ => { clearInterval(timerID) };
    }, []);

    return <h3 className="clockwatch">{time.toLocaleTimeString()}</h3>;
};

export default Clockwatch;