import mongoose, { Schema, Types } from 'mongoose';
import { TicketBase, TicketHistory, ticketStatuses } from '../schemas/ticket.schema';
export interface TicketModelType extends Omit<TicketBase, 'reporter'> {
    reporter: Types.ObjectId;
    currentStateStartedAt: Date;
    statusHistory: TicketHistory[];
    createdAt: Date;
    updatedAt: Date;
}
const TicketSchema = new Schema<TicketModelType>(
    {
        title: { type: String, required: true, unique: true },
        reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        estimateTime: { type: Number, required: true },
        currentState: {
            type: String,
            enum: ticketStatuses,
            default: 'open',
            required: true
        },
        currentStateStartedAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        statusHistory: [
            {
                state: { type: String, enum: ticketStatuses },
                enteredAt: { type: Date, required: true },
                exitedAt: { type: Date, default: null },
            },
        ],
    },
    { timestamps: true }
);

TicketSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(_: any, ret: Record<string, any>) {
        if (ret._id && typeof ret._id === 'object' && typeof ret._id.toString === 'function') {
            ret._id = ret._id.toString();
        }

        if (ret.reporter && typeof ret.reporter === 'object' && ret.reporter._id) {
            if (typeof ret.reporter._id === 'object' && typeof ret.reporter._id.toString === 'function') {
                ret.reporter._id = ret.reporter._id.toString();
            }
        } else if (ret.reporter) {
            ret.reporter = ret.reporter.toString();
        }

        return ret;
    },
});


export default mongoose.model<TicketModelType>('Ticket', TicketSchema);
