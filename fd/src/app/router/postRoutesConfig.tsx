import DashboardPage from '@/features/dashboard/pages';
import Error from '@/features/error/pages';
import ErrorElement from '@/features/error/pages/ErrorElement';
import { RouteConfig } from '@/features/signup/types/route.types';
import { Role } from '../types/roles';

export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: <DashboardPage />,
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'device',
        component: <DashboardPage />,
        roles: [Role.ADMIN, Role.USER],
        errorElement: <ErrorElement />,
        children: [
          {
            path: 'settings',
            component: <DashboardPage />,
            roles: [Role.ADMIN],
            errorElement: <ErrorElement />
          },
        ],
      },
      {
        path: 'user',
        component: <DashboardPage />,
        roles: [Role.ADMIN],
        errorElement: <ErrorElement />,
        children: [
          {
            path: ':id',
            component: <DashboardPage />,
            roles: [Role.ADMIN],
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
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
  },
];
