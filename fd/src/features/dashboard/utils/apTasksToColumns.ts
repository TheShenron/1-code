// Dashboard/utils/mapTasksToColumns.ts
import { Task, Columns } from '../types/task.types';

export const mapTasksToColumns = (tasks: Task[]): Columns => {
    const columns: Columns = {
        open: { name: 'Open', items: [] },
        inprogress: { name: 'In Progress', items: [] },
        inpending: { name: 'In Pending', items: [] },
        blocked: { name: 'Blocked', items: [] },
        qa_review: { name: 'QA Review', items: [] },
    };

    tasks.forEach((task) => {
        const card = {
            id: task._id,
            title: task.title,
            estimateTime: task.estimateTime,
            timeSpentInProgress: task.timeSpentInProgress,
            reporter: task.reporter,
        };

        if (columns[task.currentState]) {
            columns[task.currentState].items.push(card);
        }
    });

    return columns;
};
