import DashboardPage from '@/features/dashboard/pages';
import Error from '@/features/error/pages'
import ErrorElement from '@/features/error/pages/ErrorElement';

export const routesConfig = [
    {
        path: '/',
        component: <DashboardPage />,
        roles: ['ADMIN', 'USER', "GUEST"],
        errorElement: <ErrorElement />,
        children: [
            {
                path: 'device',
                component: <DashboardPage />,
                roles: ['ADMIN', 'USER'],
                errorElement: <ErrorElement />,
                children: [
                    {
                        path: 'settings',
                        component: <DashboardPage />,
                        roles: ['ADMIN'],
                        errorElement: <ErrorElement />
                    },
                ],
            },
            {
                path: 'user',
                component: <DashboardPage />,
                roles: ['ADMIN'],
                errorElement: <ErrorElement />,
                children: [
                    {
                        path: ':id',
                        component: <DashboardPage />,
                        roles: ['ADMIN'],
                        errorElement: <ErrorElement />
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        component: <Error />,
        errorElement: <ErrorElement />,
        roles: ['ADMIN', 'USER', "GUEST"],
    },
];
