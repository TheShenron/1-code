import { z } from 'zod';
import { ticketStates } from '../types/ticket.type';

export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    reporter: z.string().min(1, "Reporter is required"),
    estimateTime: z.number().positive("Estimate time must be a positive number"),
    currentState: z.enum(ticketStates),
    timeSpentInProgress: z.number().nonnegative("TimeSpentInProgres must be a positive number"),
});

export const getTicketByIDSchema = z.object({
    reporterId: z.string().min(1, 'Reporter id is required')
});

export const updateTicketStateSchema = z.object({
    newState: z.enum(ticketStates),
});

export const updateTicketStateParamSchema = z.object({
    id: z.string().min(1, 'Reporter id is required')
});


export type UpdateTicketStateInput = z.infer<typeof updateTicketStateSchema>;
