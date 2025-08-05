import { z } from 'zod';
import { ticketStates } from '../types/ticket.type';

export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    reporter: z.string().min(1, "Reporter is required"),
    estimateTime: z.number().positive("Estimate time must be a positive number"),
    currentState: z.enum(ticketStates),
    timeSpentInProgress: z.number().nonnegative("TimeSpentInProgres must be a positive number"),
});