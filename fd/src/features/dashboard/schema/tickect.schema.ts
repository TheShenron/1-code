// services/dashboard/dashboard.schema.ts
import { z } from 'zod';
import { Duration } from 'luxon';


export const ticketStatuses = [
  'open',
  'inprogress',
  'inpending',
  'blocked',
  'qa_review',
] as const;

export const ticketStatusSchema = z.enum(ticketStatuses);
export type TicketStatus = z.infer<typeof ticketStatusSchema>;
export const isValidTicketState = (value: unknown): value is TicketStatus => {
  return ticketStatuses.includes(value as TicketStatus);
};

export const ticketreporterSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});
export type Ticketreporter = z.infer<typeof ticketreporterSchema>;


export const ticketHistorySchema = z.object({
  state: ticketStatusSchema,
  enteredAt: z.coerce.date(),
  exitedAt: z.coerce.date().nullable().optional(),
  _id: z.string(),
});
export type TicketHistory = z.infer<typeof ticketHistorySchema>;


export const ticketSchema = z.object({
  _id: z.string(),
  title: z.string(),
  estimateTime: z.number(),
  currentState: ticketStatusSchema,
  reporter: ticketreporterSchema,
  currentStateStartedAt: z.coerce.date(),
  statusHistory: z.array(ticketHistorySchema),
});
export type Ticket = z.infer<typeof ticketSchema>;


export const ticketsSchema = z.object({
  tickets: z.array(ticketSchema),
});
export type Tickets = z.infer<typeof ticketsSchema>;


export const getTasksResponseSchema = z.object({
  data: ticketsSchema,
  success: z.boolean(),
  message: z.string()
});
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>;


export const columnSchema = z.object({
  name: z.string(),
  tasks: z.array(ticketSchema),
});
export type Column = z.infer<typeof columnSchema>;

export type ColumnMap = Record<Ticket['currentState'], Column>;

export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters long')
    .max(50, 'Title must be at most 50 characters long')
  ,
  reporter: z.string().min(1, 'Reporter ID is required'),
  estimateTime: z.number().min(0.5, 'Estimate time must be positive').max(56, 'Estimate time must be less then 7d'),
  timeSpentInProgress: z.number().min(0, 'Time spent must be positive').max(56, 'Time spent must be less then 7d').optional().default(0),
  currentState: ticketStatusSchema.default('open'),
});
export type CreateTicket = z.infer<typeof createTicketSchema>;
export type CreateTicketInput = z.input<typeof createTicketSchema>;

export const updateTicketSchema = z.object({
  id: z.string(),
  title: z.string().min(5, 'Title is required'),
  reporter: z.string().min(1, 'Reporter ID is required'),
  estimateTime: z.number().min(0, 'Estimate time must be positive'),
  timeSpentInProgress: z.number().min(0).optional().default(0),
  currentState: ticketStatusSchema.default('open'),
});
export type UpdateTicket = z.infer<typeof updateTicketSchema>;
export type UpdateTicketInput = z.input<typeof updateTicketSchema>;


//Ticket time calc helper function type
export interface ProgressTimeResult {
  totalInProgressDuration: Duration;
}