import { store } from '@/app/store';
import axios, { AxiosError, HttpStatusCode } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const handleUnauthorized = (): void => {
  localStorage.clear();
  window.location.href = '/';
};

const handleForbidden = (): void => {
  console.warn('Access denied');
};

const handleServerError = (): void => {
  console.error('Server error occurred');
};

const handleNoResponse = (): void => {
  console.error('No response from server');
};

const handleSetupError = (message: string): void => {
  console.error('Error setting up request:', message);
};

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  const { response, request, message } = error;

  if (response) {
    const { status } = response;

    switch (status) {
      case HttpStatusCode.Unauthorized:
        handleUnauthorized();
        return Promise.reject(error);

      case HttpStatusCode.Forbidden:
        handleForbidden();
        break;

      default:
        if (status >= HttpStatusCode.InternalServerError) {
          handleServerError();
        }
        break;
    }
  } else if (request) {
    handleNoResponse();
  } else {
    handleSetupError(message);
  }

  return Promise.reject(error);
};

api.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.login?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => response, errorHandler);

export default api;
