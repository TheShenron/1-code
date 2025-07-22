import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:3000';

let socket: Socket;

export const initSocket = (): Socket => {
    socket = io(URL, {
        transports: ['websocket'],
    });

    socket.on('connect', () => {
        console.log('WebSocket connected:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });

    return socket;
};

export { socket };
