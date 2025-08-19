import mongoose, { Schema, Types } from 'mongoose';
import { TicketBase, TicketHistory, ticketStatuses, TicketUser } from '../schemas/ticket.schema';

export interface SnapshotTicketEntry extends Omit<TicketBase, 'reporter'> {
    _id: Types.ObjectId,
    reporter: TicketUser;
    currentStateStartedAt: Date;
    statusHistory: TicketHistory[];
    createdAt: Date;
    updatedAt: Date;
}

export interface DailySnapshotType {
    userId: Types.ObjectId;
    date: Date;
    tickets: SnapshotTicketEntry[];
}

const SnapshotTicketSchema = new Schema<SnapshotTicketEntry>({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    reporter: {
        _id: { type: Schema.Types.ObjectId, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
    },
    estimateTime: { type: Number, required: true },
    currentState: {
        type: String,
        enum: ticketStatuses,
        required: true
    },
    currentStateStartedAt: {
        type: Date,
        required: true
    },
    statusHistory: [
        {
            state: { type: String, enum: ticketStatuses },
            enteredAt: { type: Date, required: true },
            exitedAt: { type: Date, default: null },
        },
    ],
    createdAt: { type: Date },
    updatedAt: { type: Date }
},
    { _id: false }
);

const DailySnapshotSchema = new Schema<DailySnapshotType>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        tickets: [SnapshotTicketSchema],
    },
    { timestamps: true }
);

DailySnapshotSchema.index({ userId: 1, date: 1 }, { unique: true });

DailySnapshotSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: any) => {
        ret._id = ret._id.toString();
        ret.userId = ret.userId.toString();

        if (Array.isArray(ret.tickets)) {
            ret.tickets = ret.tickets.map((entry: any) => {
                entry._id = entry._id.toString();

                if (entry.reporter && entry.reporter._id) {
                    entry.reporter._id = entry.reporter._id.toString();
                }

                return entry;
            });
        }

        return ret;
    }
});



const DailySnapshot = mongoose.model<DailySnapshotType>(
    'DailySnapshot',
    DailySnapshotSchema
);

export default DailySnapshot