import TicketModel from "../models/Ticket.model";
import { AppError } from "../utils/AppError";
import { ERROR_MESSAGES } from '../constants/errors.constant'
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
const { CREATE_FAILED, UPDATE_FAILED, NOT_FOUND, DELETE_FAILED } = ERROR_MESSAGES.TICKET
import { createdTicketResp, CreatedTicketResp, CreateTicket, GetTicketById, GetTicketByID, TicketUser, } from "../schemas/ticket.schema";
import { DateTime } from 'luxon'

export const createTickets = async (data: CreateTicket): Promise<CreatedTicketResp> => {

    try {

        const ticket = await new TicketModel(data).save();
        const populatedTicket = await ticket.populate<{ reporter: TicketUser }>('reporter', 'name email');
        const plainTicket = populatedTicket.toObject();
        return createdTicketResp.parse(plainTicket);

    } catch (error: any) {

        throw new AppError(
            CREATE_FAILED.code,
            CREATE_FAILED.message,
            StatusCodes.CONFLICT,
            error
        );
    }

};


export const deleteTicketById = async (id: string): Promise<CreatedTicketResp> => {
    try {
        const deletedTicket = await TicketModel
            .findByIdAndDelete(id)
            .populate<{ reporter: TicketUser }>('reporter', 'name email');

        if (!deletedTicket) {
            throw new AppError(
                DELETE_FAILED.code,
                'Ticket not found',
                StatusCodes.NOT_FOUND
            );
        }

        const plainTicket = deletedTicket.toObject();
        return createdTicketResp.parse(plainTicket);
    } catch (error: any) {
        throw new AppError(
            DELETE_FAILED.code,
            DELETE_FAILED.message,
            StatusCodes.CONFLICT,
            error
        );
    }
};


export const getTicketsByReporterId = async (
    data: GetTicketByID
): Promise<(CreatedTicketResp)[]> => {
    const { reporterId } = data;
    try {

        if (!mongoose.Types.ObjectId.isValid(reporterId)) {
            throw new AppError(
                'INVALID_REPORTER_ID',
                'Provided reporter ID is not valid.',
                StatusCodes.BAD_REQUEST
            );
        }

        const tickets = await TicketModel
            .find({ reporter: reporterId })
            .populate('reporter', 'name email')
            .lean();

        const result = tickets
            .map(ticket => createdTicketResp.safeParse(ticket))
            .filter(p => p.success)
            .map(p => p.data);

        return result;

    } catch (error) {
        // console.log(error)
        throw new AppError(
            'GET_TICKETS_FAILED',
            'An unexpected error occurred while fetching tickets.',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

export const findTicketsByID = async (data: GetTicketById): Promise<CreatedTicketResp> => {
    const ticket = await TicketModel.findById(data.id);

    if (!ticket) {
        throw new Error('Ticket not found');
    }

    const saved = await ticket.save();
    await saved.populate('reporter', 'name email');
    return createdTicketResp.parse(saved.toJSON());

};

export const fineUpdateTicketsByID = async (ticketData: GetTicketById): Promise<CreatedTicketResp> => {

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
        const now = DateTime.now();

        const lastHistory = ticket.statusHistory[ticket.statusHistory.length - 1];
        if (lastHistory && !lastHistory.exitedAt) {
            lastHistory.exitedAt = now.toJSDate();
        }

        ticket.currentState = newState;
        ticket.currentStateStartedAt = now.toJSDate();
        ticket.statusHistory.push({
            state: newState,
            enteredAt: now.toJSDate(),
        });

        const saved = await ticket.save();
        await saved.populate('reporter', 'name email');
        return createdTicketResp.parse(saved.toJSON());

    } catch (error) {

        throw new AppError(
            UPDATE_FAILED.code,
            UPDATE_FAILED.message,
            StatusCodes.BAD_REQUEST,
            error
        );
    }
};

export const updateTicketTitleById = async (
    data: { id: string, title: string }
): Promise<CreatedTicketResp | null> => {
    const { id, title } = data;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError(
                'INVALID_TICKET_ID',
                'Provided ticket ID is not valid.',
                StatusCodes.BAD_REQUEST
            );
        }

        const updatedTicket = await TicketModel.findByIdAndUpdate(
            id,
            { title: title },
            { new: true }
        )
            .populate('reporter', 'name email')

        if (!updatedTicket) {
            throw new AppError(
                'TICKET_NOT_FOUND',
                'Ticket not found with the given ID.',
                StatusCodes.NOT_FOUND
            );
        }

        return createdTicketResp.parse(updatedTicket.toJSON());
    } catch (error) {
        throw new AppError(
            'UPDATE_TICKET_FAILED',
            'An unexpected error occurred while updating the ticket title.',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};
