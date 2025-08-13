// services/dashboard/dashboard.query.ts
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { createTicket, deleteTicket, getTickets, updateTicket, updateTicketStatus } from './api';
import { CreateTicket, GetTasksResponse, TicketStatus, UpdateTicket } from '../schema/tickect.schema';



export const useTasksQuery = (reporterId?: string): UseQueryResult<GetTasksResponse, Error> => {
  return useQuery<GetTasksResponse>({
    queryKey: ['dashboard', 'tasks', reporterId],
    queryFn: () => getTickets(reporterId!),
    enabled: !!reporterId,
    staleTime: 1000 * 60 * 5,
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTasksMutation = () => {
  return useMutation({
    mutationFn: (reporterId: string) => getTickets(reporterId),
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCreateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicket) => createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateTicket }) => updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeleteTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdateTicketStateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newState }: { id: string; newState: TicketStatus }) =>
      updateTicketStatus(id, newState),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};
