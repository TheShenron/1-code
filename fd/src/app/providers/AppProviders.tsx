import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }): ReactElement => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
          <ToastContainer position="bottom-left" autoClose={2000} newestOnTop />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
