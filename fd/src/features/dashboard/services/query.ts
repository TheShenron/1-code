// services/dashboard/dashboard.query.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { createTicket, deleteTicket, getTickets, updateTicket, updateTicketStatus } from './api';
import {
  CreateTasksResponse,
  CreateTicket,
  GetTasksResponse,
  TicketStatus,
  UpdateTicket,
} from '../schema/tickect.schema';

const MILLISECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES = 5;

const FIVE_MINUTES_IN_MS = MILLISECOND * SECONDS_IN_MINUTE * MINUTES;

export const useTasksQuery = (reporterId?: string): UseQueryResult<GetTasksResponse, Error> => {
  return useQuery<GetTasksResponse>({
    queryKey: ['dashboard', 'tasks', reporterId],
    queryFn: () => getTickets(reporterId!),
    enabled: !!reporterId,
    staleTime: FIVE_MINUTES_IN_MS,
  });
};

export const useTasksMutation = (): UseMutationResult<GetTasksResponse, Error, string> => {
  return useMutation({
    mutationFn: (reporterId: string) => getTickets(reporterId),
  });
};

export const useCreateTicketMutation = (): UseMutationResult<
  CreateTasksResponse,
  Error,
  CreateTicket
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicket) => createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

export const useUpdateTicketMutation = (): UseMutationResult<
  CreateTasksResponse,
  Error,
  { id: string; data: UpdateTicket }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicket }) => updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

export const useDeleteTicketMutation = (): UseMutationResult<
  CreateTasksResponse,
  Error,
  { id: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};

export const useUpdateTicketStateMutation = (): UseMutationResult<
  CreateTasksResponse,
  Error,
  { id: string; newState: TicketStatus }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newState }: { id: string; newState: TicketStatus }) =>
      updateTicketStatus(id, newState),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'tasks'] });
    },
  });
};
