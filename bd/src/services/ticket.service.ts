import TicketModel from "../models/Ticket.model";
import { CreateTicketDTO, GetTicketsByIdDTO, GetTicketsByReporterDTO, ITicket, } from "../types/ticket.type";
import { AppError } from "../utils/AppError";
import { ERROR_MESSAGES } from '../constants/errors.constant'
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
const { CREATE_FAILED, UPDATE_FAILED, NOT_FOUND } = ERROR_MESSAGES.TICKET
import dayjs from "dayjs";

export const createTickets = async (data: CreateTicketDTO): Promise<ITicket> => {

    try {
        const ticket = new TicketModel(data);
        return await ticket.save();
    } catch (error: any) {

        throw new AppError(
            CREATE_FAILED.code,
            CREATE_FAILED.message,
            StatusCodes.CONFLICT,
            error
        );
    }

};

export const getTicketsByReporterId = async (
    data: GetTicketsByReporterDTO
): Promise<(ITicket)[]> => {
    const { reporterId } = data;
    try {

        if (!mongoose.Types.ObjectId.isValid(reporterId)) {
            throw new AppError(
                'INVALID_REPORTER_ID',
                'Provided reporter ID is not valid.',
                StatusCodes.BAD_REQUEST
            );
        }

        return await TicketModel.find({ reporter: reporterId }).populate('reporter', 'name email').lean();

    } catch (error) {

        throw new AppError(
            'GET_TICKETS_FAILED',
            'An unexpected error occurred while fetching tickets.',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

export const findTicketsByID = async (data: GetTicketsByIdDTO): Promise<ITicket> => {
    const ticket = await TicketModel.findById(data.id);

    if (!ticket) {
        throw new Error('Ticket not found');
    }
    return ticket.save();
};

export const fineUpdateTicketsByID = async (ticketData: GetTicketsByIdDTO): Promise<ITicket> => {

    try {
        const { id, newState } = ticketData;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError(
                'INVALID_REPORTER_ID',
                'Provided reporter ID is not valid.',
                StatusCodes.BAD_REQUEST
            );
        }

        const ticket = await TicketModel.findById(id);

        if (!ticket) {

            throw new AppError(
                NOT_FOUND.code,
                NOT_FOUND.message,
                StatusCodes.NOT_FOUND,
            );
        }

        const now = dayjs();

        const lastHistory = ticket.statusHistory[ticket.statusHistory.length - 1];
        if (lastHistory && !lastHistory.exitedAt) {
            lastHistory.exitedAt = now.toDate();
        }

        ticket.currentState = newState;
        ticket.currentStateStartedAt = now.toDate();
        ticket.statusHistory.push({
            state: newState,
            enteredAt: now.toDate(),
        });

        return await ticket.save();

    } catch (error) {

        throw new AppError(
            UPDATE_FAILED.code,
            UPDATE_FAILED.message,
            StatusCodes.BAD_REQUEST,
            error
        );
    }
};
