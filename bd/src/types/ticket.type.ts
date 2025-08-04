import { Request } from "express";
import { Document, Types } from "mongoose";

export interface UserPayload {
    id: string;
    email: string;
}
export interface AuthRequest extends Request {
    user?: UserPayload;
}

export const ticketStates = [
    'open',
    'inprogress',
    'inpending',
    'blocked',
    'qa_review',
] as const;

export type TicketState = typeof ticketStates[number];

export interface ITicket extends Document {
    title: string;
    reporter: Types.ObjectId;
    estimateTime: number;
    timeSpentInProgress: number;
    inProgressStartedAt?: Date | null;
    currentState: TicketState;
    createdAt: Date;
    updatedAt: Date;
}