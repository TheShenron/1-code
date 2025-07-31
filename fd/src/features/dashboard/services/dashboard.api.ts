// services/dashboard/dashboard.api.ts
import api from '@/services/api';
import { getTasksResponseSchema, Task } from './dashboard.schema';

export const getTasks = async (reporterId: string): Promise<Task[]> => {
    const { data: respData } = await api.get(`/ticket/reporter/${reporterId}`);

    const result = getTasksResponseSchema.safeParse(respData);
    if (!result.success) {
        console.error('Zod validation failed:', result.error);
        throw new Error('Invalid task data from API');
    }

    return result.data.data;
};
