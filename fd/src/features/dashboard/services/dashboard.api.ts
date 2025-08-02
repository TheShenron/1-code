// services/dashboard/dashboard.api.ts
import api from '@/services/api';
import { getTasksResponseSchema, Task, createTicketSchema } from './dashboard.schema';
import type { z } from 'zod';
import { TicketState } from '../types/task.types';

export const getTasks = async (reporterId: string): Promise<Task[]> => {
    const { data: respData } = await api.get(`/ticket/reporter/${reporterId}`);

    const result = getTasksResponseSchema.safeParse(respData);
    if (!result.success) {
        console.error('Zod validation failed:', result.error);
        throw new Error('Invalid task data from API');
    }

    return result.data.data;
};

export type CreateTicketInput = z.input<typeof createTicketSchema>;

export const createTicket = async (payload: CreateTicketInput): Promise<void> => {
    const { data: respData } = await api.post('/ticket', payload);
    return respData;
};

export const updateTicketState = async (id: string, newState: TicketState): Promise<void> => {
    await api.patch(`/ticket/${id}/state`, { newState });
};
