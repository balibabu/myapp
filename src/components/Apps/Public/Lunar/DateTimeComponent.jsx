import React, { useState, useEffect } from 'react';

const DateTimeComponent = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <div>
            <div>{formatDate(currentDateTime)}</div>
        </div>
    );
};

export default DateTimeComponent;
