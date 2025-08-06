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

export interface StatusHistoryEntry {
    state: TicketState;
    enteredAt: Date;
    exitedAt?: Date | null;
}
export interface ITicket extends Document {
    title: string;
    reporter: Types.ObjectId;
    estimateTime: number;
    currentState: TicketState;
    currentStateStartedAt: Date,
    statusHistory: StatusHistoryEntry[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTicketDTO {
    title: string;
    reporter: string;
    estimateTime: number;
    currentState: string,
    timeSpentInProgress: number,
}

export interface GetTicketsByReporterDTO {
    reporterId: string;
}

export interface GetTicketsByIdDTO {
    id: string;
    newState: TicketState
}