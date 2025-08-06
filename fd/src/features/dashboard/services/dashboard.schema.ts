// services/dashboard/dashboard.schema.ts
import { z } from 'zod';
import { ticketStates } from '../types/task.types';

export const reporterSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
});

export const StatusHistoryEntry = z.object({
    state: z.enum(ticketStates),
    enteredAt: z.coerce.date(),
    exitedAt: z.coerce.date().optional(),
})

export const taskSchema = z.object({
    tickets: z.array(z.object({
        _id: z.string(),
        title: z.string(),
        estimateTime: z.number(),
        currentState: z.enum(ticketStates),
        reporter: reporterSchema,
        currentStateStartedAt: z.coerce.date(),
        statusHistory: z.array(StatusHistoryEntry),
    }))
});

export const getTasksResponseSchema = z.object({
    data: taskSchema,
    success: z.boolean(),
    message: z.string()
});

export type Task = z.infer<typeof taskSchema>;
export type Ticket = Task['tickets'][number];


export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    reporter: z.string().min(1, "Reporter ID is required"), // ObjectId as string
    estimateTime: z.number().min(0, "Estimate time must be positive"),
    timeSpentInProgress: z.number().min(0).optional().default(0),
    currentState: z.enum(ticketStates).default('open'),
});
