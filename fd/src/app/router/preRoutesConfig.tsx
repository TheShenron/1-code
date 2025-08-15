import LoginPage from '@/features/login/pages';
import SignupPage from '@/features/signup/pages';
import Error from '@/features/error/pages';
import ErrorElement from '@/features/error/pages/ErrorElement';
import { Role, RouteConfig } from '../types/roles';

export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: <LoginPage />,
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
    errorElement: <ErrorElement />
  },
  {
    path: '/login',
    component: <LoginPage />,
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
    errorElement: <ErrorElement />
  },
  {
    path: '/signup',
    component: <SignupPage />,
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
    errorElement: <ErrorElement />
  },
  {
    path: '*',
    component: <Error />,
    errorElement: <ErrorElement />,
    roles: [Role.ADMIN, Role.GUEST, Role.USER],
  },
];
