// services/dashboard/dashboard.api.ts
import api from '@/services/api';
import { getTasksResponseSchema, GetTasksResponse, TicketStatus, CreateTicket, UpdateTicket } from '../schema/tickect.schema';


export const getTickets = async (reporterId: string): Promise<GetTasksResponse> => {
    const { data: respData } = await api.get(`/ticket/reporter/${reporterId}`);

    const result = getTasksResponseSchema.safeParse(respData);
    if (!result.success) {
        console.error('Zod validation failed:', result.error);
        throw new Error('Invalid task data from API');
    }
    return result.data;
};

export const createTicket = async (payload: CreateTicket): Promise<void> => {
    const { data: respData } = await api.post('/ticket', payload);
    return respData;
    //here we need to check reponse and add the response type insted of promise<void>
};

export const updateTicket = async (id: string, payload: UpdateTicket): Promise<void> => {
    const { data: respData } = await api.patch(`/ticket/${id}/update`, payload);
    return respData;
    //here we need to check reponse and add the response type insted of promise<void>
};

export const deleteTicket = async (id: string): Promise<void> => {
    const { data: respData } = await api.patch(`/ticket/${id}/delete`,);
    return respData;
    //here we need to check reponse and add the response type insted of promise<void>
};

export const updateTicketStatus = async (id: string, newState: TicketStatus): Promise<void> => {
    await api.patch(`/ticket/${id}/state`, { newState });
    //here we need to check reponse and add the response type insted of promise<void>
};
