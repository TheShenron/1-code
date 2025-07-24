import mongoose, { Schema, Document, Types } from 'mongoose';

export type TicketState = 'open' | 'inprogress' | 'inpending' | 'blocked' | 'qa_review';

export interface ITicket extends Document {
    title: string;
    reporter: Types.ObjectId;
    estimateTime: number;
    timeSpentInProgress: number;
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
        currentState: {
            type: String,
            enum: ['open', 'inprogress', 'inpending', 'blocked', 'qa_review'],
            default: 'open',
        },
    },
    { timestamps: true }
);

export default mongoose.model<ITicket>('Ticket', TicketSchema);
