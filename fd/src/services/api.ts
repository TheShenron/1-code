import { store } from '@/app/store';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
    const state = store.getState()
    const token = state.login?.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                localStorage.removeItem('token');
                // window.location.href = '/login';
            }

            if (status === 403) {
                console.warn('Access denied');
            }

            if (status >= 500) {
                console.error('Server error occurred');
            }
        } else if (error.request) {
            console.error('No response from server');
        } else {
            console.error('Error setting up request:', error.message);
        }

        return Promise.reject(error);
    }
);


export default api;
