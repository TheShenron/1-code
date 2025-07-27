import { routesConfig } from './routesConfig';
import { Role } from '@/app/types/roles';

export const getRoutesForRole = (role: Role) => {

    return routesConfig.filter(route => route.roles.includes(role));
};
