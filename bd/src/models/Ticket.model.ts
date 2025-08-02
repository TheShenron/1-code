import mongoose, { Schema, Document, Types } from 'mongoose';

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

const TicketSchema = new Schema<ITicket>(
    {
        title: { type: String, required: true, unique: true },
        reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        estimateTime: { type: Number, required: true },
        timeSpentInProgress: { type: Number, default: 0 },
        inProgressStartedAt: {
            type: Date,
            default: null,
        },
        currentState: {
            type: String,
            enum: ticketStates,
            default: 'open',
        },
    },
    { timestamps: true }
);

export default mongoose.model<ITicket>('Ticket', TicketSchema);
