export const ticketStates = [
    'open',
    'inprogress',
    'inpending',
    'blocked',
    'qa_review',
] as const;

export type TicketState = typeof ticketStates[number];

export const isValidTicketState = (value: any): value is TicketState => {
    return ticketStates.includes(value);
};

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
    currentState: TicketState;
    reporter: Reporter;
}

export interface TaskCard {
    id: string;
    title: string;
    estimateTime: number;
    timeSpentInProgress: number;
    reporter: Reporter;
    currentState: TicketState;
}

export interface Column {
    name: string;
    items: TaskCard[];
}

export type Columns = Record<string, Column>;
