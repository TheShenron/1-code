import { Role } from '@/app/types/roles';
import { RouteConfig } from '@/features/signup/types/route.types';

export const filterRoutesByRole = (
  routes: RouteConfig[],
  role: Role
): RouteConfig[] => {
  return routes.filter((route) => route.roles.includes(role))
    .map((route) => {
      const filteredChildren = route.children
        ? filterRoutesByRole(route.children, role)
        : [];

      return {
        ...route,
        children: filteredChildren,
      };
    });
};
