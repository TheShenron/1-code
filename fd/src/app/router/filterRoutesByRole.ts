import { Role, RouteConfig } from '@/app/types/roles';

export const filterRoutesByRole = (routes: RouteConfig[], role: Role): RouteConfig[] => {
  return routes
    .filter(route => route.roles.includes(role))
    .map(route => {
      const filteredChildren = route.children ? filterRoutesByRole(route.children, role) : [];

      return {
        ...route,
        children: filteredChildren,
      };
    });
};
