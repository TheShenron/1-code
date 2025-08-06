import mongoose, { Schema } from 'mongoose';
import { ITicket, ticketStates } from '../types/ticket.type';

const TicketSchema = new Schema<ITicket>(
    {
        title: { type: String, required: true, unique: true },
        reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        estimateTime: { type: Number, required: true },
        currentState: {
            type: String,
            enum: ticketStates,
            default: 'open',
        },
        currentStateStartedAt: {
            type: Date,
            default: Date.now,
        },
        statusHistory: [
            {
                state: { type: String, enum: ticketStates },
                enteredAt: { type: Date, required: true },
                exitedAt: { type: Date, default: null },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model<ITicket>('Ticket', TicketSchema);
