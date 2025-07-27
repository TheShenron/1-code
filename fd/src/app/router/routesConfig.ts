import LoginPage from '@/features/login/pages';
import DashboardPage from '@/features/dashboard/pages';

export const routesConfig = [
    {
        path: '/',
        component: LoginPage,
        roles: ['GUEST'],
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        roles: ['ADMIN', 'USER'],
        children: [
            {
                path: 'device',
                component: DashboardPage,
                roles: ['ADMIN', 'USER'],
                children: [
                    {
                        path: 'settings',
                        component: DashboardPage,
                        roles: ['ADMIN'],
                    },
                ],
            },
            {
                path: 'user',
                component: DashboardPage,
                roles: ['ADMIN'],
                children: [
                    {
                        path: ':id',
                        component: DashboardPage,
                        roles: ['ADMIN'],
                    },
                ],
            },
        ],
    },
];
