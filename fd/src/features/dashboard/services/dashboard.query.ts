// services/dashboard/dashboard.query.ts
import { useQuery } from '@tanstack/react-query';
import { getTasks } from './dashboard.api';
import { Task } from './dashboard.schema';

export const useTasksQuery = (reporterId: string) => {
    return useQuery<Task[]>({
        queryKey: ['dashboard', 'tasks'],
        queryFn: () => getTasks(reporterId),
        enabled: !!reporterId,
        staleTime: 1000 * 60 * 5,
    });
};
