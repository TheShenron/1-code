import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient()

export const AppProviders = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
