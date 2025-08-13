import { Role } from '@/app/types/roles';
import { ReactNode } from 'react';

export type RouteConfig = {
    path: string;
    component: ReactNode;
    errorElement?: ReactNode;
    roles: Role[];
    children?: RouteConfig[];
};
