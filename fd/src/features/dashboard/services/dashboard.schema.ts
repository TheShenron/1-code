// services/dashboard/dashboard.schema.ts
import { z } from 'zod';

export const reporterSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    avatar: z.string().optional(),
});

export const taskSchema = z.object({
    _id: z.string(),
    title: z.string(),
    estimateTime: z.number(),
    timeSpentInProgress: z.number(),
    currentState: z.enum(['open', 'inprogress', 'inpending', 'blocked', 'qa_review']),
    reporter: reporterSchema,
});

export const getTasksResponseSchema = z.object({
    data: z.array(taskSchema),
});

export type Task = z.infer<typeof taskSchema>;


export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    reporter: z.string().min(1, "Reporter ID is required"), // ObjectId as string
    estimateTime: z.number().min(0, "Estimate time must be positive"),
    timeSpentInProgress: z.number().min(0).optional().default(0),
    currentState: z.enum(['open', 'inprogress', 'inpending', 'blocked', 'qa_review']).default('open'),
});
