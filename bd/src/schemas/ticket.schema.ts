import { z } from 'zod';

export const ticketStatuses = [
    'open',
    'inprogress',
    'inpending',
    'blocked',
    'qa_review',
] as const;

export const ticketStatusSchema = z.enum(ticketStatuses);
export type TicketStatus = z.infer<typeof ticketStatusSchema>;
export const isValidTicketState = (value: any): value is TicketStatus => {
    return ticketStatuses.includes(value);
};

// Ticket Base schema
const ticketBaseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    reporter: ticketStatusSchema,
    estimateTime: z.number().positive("Estimate time must be a positive number"),
    currentState: ticketStatusSchema,
});
export type TicketBase = z.infer<typeof ticketBaseSchema>;

//Create Ticket Schema
export const createTicketSchema = ticketBaseSchema.extend({
    reporter: z.string().min(1, "Reporter is required")
});
export type CreateTicket = z.infer<typeof createTicketSchema>

//Ticket History schema
export const ticketHistorySchema = z.object({
    _id: z.coerce.string().optional(),
    state: ticketStatusSchema,
    enteredAt: z.coerce.date(),
    exitedAt: z.coerce.date().nullable().optional(),
});
export type TicketHistory = z.infer<typeof ticketHistorySchema>;

//Ticket User Schema
export const ticketUserSchema = z.object({
    _id: z.coerce.string().optional(),
    name: z.string(),
    email: z.string().email()
});
export type TicketUser = z.infer<typeof ticketUserSchema>;

//Create Ticket Response Schema
export const createdTicketResp = z.object({
    _id: z.coerce.string().optional(),
    currentStateStartedAt: z.coerce.date(),
    statusHistory: z.array(ticketHistorySchema),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    title: z.string(),
    reporter: ticketUserSchema,
    estimateTime: z.number(),
    currentState: ticketStatusSchema,
})
export type CreatedTicketResp = z.infer<typeof createdTicketResp>


export const getTicketByIDSchema = z.object({
    reporterId: z.string().min(1, 'Reporter id is required')
});
export type GetTicketByID = z.infer<typeof getTicketByIDSchema>

export const updateTicketStateSchema = z.object({
    newState: ticketStatusSchema,
});
export type UpdateTicketState = z.infer<typeof updateTicketStateSchema>


export const updateTicketSchema = z.object({
    title: z.string(),
});
export type UpdateTicket = z.infer<typeof updateTicketSchema>


export const updateTicketStateParamSchema = z.object({
    id: z.string().min(1, 'Reporter id is required')
});
export type UpdateTicketStateParam = z.infer<typeof updateTicketStateParamSchema>

export const getTicketById = updateTicketStateParamSchema.merge(updateTicketStateSchema)
export type GetTicketById = z.infer<typeof getTicketById>
