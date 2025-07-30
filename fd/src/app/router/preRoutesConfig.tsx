import LoginPage from '@/features/login/pages';
import SignupPage from '@/features/signup/pages'
import Error from '@/features/error/pages'
import ErrorElement from '@/features/error/pages/ErrorElement';

export const routesConfig = [
    {
        path: '/',
        component: <LoginPage />,
        roles: ['ADMIN', 'USER', "GUEST"],
        errorElement: <ErrorElement />
    },
    {
        path: '/login',
        component: <LoginPage />,
        roles: ['ADMIN', 'USER', "GUEST"],
        errorElement: <ErrorElement />
    },
    {
        path: '/signup',
        component: <SignupPage />,
        roles: ['ADMIN', 'USER', "GUEST"],
        errorElement: <ErrorElement />
    },
    {
        path: '*',
        component: <Error />,
        errorElement: <ErrorElement />,
        roles: ['ADMIN', 'USER', "GUEST"],
    },
];
