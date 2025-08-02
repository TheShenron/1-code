// services/dashboard/dashboard.query.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTicket, CreateTicketInput, updateTicketState } from './dashboard.api';
import { Task } from './dashboard.schema';
import { TicketState } from '../types/task.types';

export const useTasksQuery = (reporterId: string) => {
    return useQuery<Task[]>({
        queryKey: ['dashboard', 'tasks'],
        queryFn: () => getTasks(reporterId),
        enabled: !!reporterId,
        staleTime: 1000 * 60 * 5,
    });
};


export const useCreateTicketMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTicketInput) => createTicket(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
        },
    });
};


export const useUpdateTicketStateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, newState }: { id: string; newState: TicketState }) =>
            updateTicketState(id, newState),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
        },
    });
};
