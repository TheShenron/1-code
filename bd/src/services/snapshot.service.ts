import mongoose from "mongoose";
import { AppError } from "../utils/AppError";
import { StatusCodes } from "http-status-codes";
import TicketModel from "../models/Ticket.model";
import { DateTime } from 'luxon';
import { CreateSnapshot, createSnapshotResp, CreateSnapshotResp } from "../schemas/snapshot.schema";
import DailySnapshot from "../models/DailySnapshot.model";

export const createSnapShot = async (data: CreateSnapshot): Promise<CreateSnapshotResp> => {
    try {
        const { ticketIds, userId } = data

        const validObjectIds = ticketIds
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
            .map((id) => new mongoose.Types.ObjectId(id));

        if (validObjectIds.length === 0) {
            throw new AppError(
                'NO_VALID_TICKET_IDS',
                'None of the provided ticket IDs are valid.',
                StatusCodes.BAD_REQUEST
            );
        }

        const tickets = await TicketModel.find({
            _id: { $in: validObjectIds },
            reporter: userId,
        }).populate('reporter', 'name email').lean();

        if (!tickets.length) {
            throw new AppError(
                'TICKETS_NOT_FOUND',
                'No matching tickets found for the provided IDs and user.',
                StatusCodes.NOT_FOUND
            );
        }

        const today = DateTime.local();

        const snapshot = await DailySnapshot.findOneAndUpdate(
            { userId, date: today.toISODate() },
            {
                $set: {
                    userId,
                    date: today.toISODate(),
                    tickets
                }
            },
            { upsert: true, new: true }
        );

        const plainSnapShot = snapshot.toJSON();
        return createSnapshotResp.parse(plainSnapShot);

    } catch (error) {
        console.log(error)
        throw new AppError(
            'CREATE_SNAPSHOT_FAILED',
            'An unexpected error occurred while creating snapshot.',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};