// src/data.js or a similar location

export const customBoardData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Setup project structure' },
        'task-2': { id: 'task-2', content: 'Install dependencies' },
        'task-3': { id: 'task-3', content: 'Create reusable components' },
        'task-4': { id: 'task-4', content: 'Write unit tests' },
    },
    columns: {
        planned: {
            id: 'planned',
            title: 'Planned',
            taskIds: ['task-1'],
        },
        open: {
            id: 'open',
            title: 'Open',
            taskIds: ['task-2'],
        },
        inProgress: {
            id: 'inProgress',
            title: 'In Progress',
            taskIds: [],
        },
        inPending: {
            id: 'inPending',
            title: 'In Pending',
            taskIds: ['task-3'],
        },
        blocked: {
            id: 'blocked',
            title: 'Blocked',
            taskIds: [],
        },
        qaReview: {
            id: 'qaReview',
            title: 'QA Review',
            taskIds: ['task-4'],
        },
    },
    columnOrder: ['planned', 'open', 'inProgress', 'inPending', 'blocked', 'qaReview'],
};
