export interface Reporter {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Task {
    _id: string;
    title: string;
    estimateTime: number;
    timeSpentInProgress: number;
    currentState: 'open' | 'inprogress' | 'inpending' | 'blocked' | 'qa_review';
    reporter: Reporter;
}

export interface TaskCard {
    id: string;
    title: string;
    estimateTime: number;
    timeSpentInProgress: number;
    reporter: Reporter;
}

export interface Column {
    name: string;
    items: TaskCard[];
}

export type Columns = Record<string, Column>;
