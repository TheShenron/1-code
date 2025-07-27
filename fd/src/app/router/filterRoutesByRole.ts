import { Role } from '@/app/types/roles';

export const filterRoutesByRole = (
    routes,
    role: Role
) => {
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
