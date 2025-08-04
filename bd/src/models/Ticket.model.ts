import mongoose, { Schema } from 'mongoose';
import { ITicket, ticketStates } from '../types/ticket.type';

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
