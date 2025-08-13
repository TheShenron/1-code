/* eslint-disable no-unused-vars */
export const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    GUEST: 'GUEST',
} as const;

export type Role = typeof Role[keyof typeof Role];

/* eslint-enable no-unused-vars */
