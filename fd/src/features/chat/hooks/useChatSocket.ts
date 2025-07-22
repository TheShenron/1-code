import { useEffect } from 'react';
import { socket, initSocket } from '@/lib/socket';

export const useChatSocket = () => {
    useEffect(() => {
        const s = initSocket();

        s.on('message', (data) => {
            console.log('Message received:', data);
        });

        return () => {
            s.off('message');
            s.disconnect();
        };
    }, []);
};
