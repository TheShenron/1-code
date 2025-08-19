import { Role, UserPayload } from '../schemas/authSchemas';

export const canCreateTicket = (user: UserPayload, assignedUserId: string) => {
    if (user.role === Role.ADMIN) return true;
    return user.id === assignedUserId;
};

export const canGetTicket = (user: UserPayload, ticketOwnerId: string) => {
    if (user.role === Role.ADMIN) return true;
    return user.id === ticketOwnerId;
};

export const canUpdateTicket = (user: UserPayload, ticketReporterId: string): boolean => {
    if (user.role === Role.ADMIN) return true;
    return user.id === ticketReporterId;
};