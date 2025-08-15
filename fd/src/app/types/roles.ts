import { ReactNode } from 'react';

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type RouteConfig = {
  path: string;
  component: ReactNode;
  errorElement?: ReactNode;
  roles: Role[];
  children?: RouteConfig[];
};
