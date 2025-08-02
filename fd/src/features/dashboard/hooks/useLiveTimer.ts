import { useEffect, useState } from 'react';

export const useLiveTimer = (initialHours: number, isActive: boolean) => {
    const [seconds, setSeconds] = useState(initialHours * 60);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(2);

    return `${hours}h ${minutes}m ${secs}s`;
};
