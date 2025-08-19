import { NextFunction, Response } from 'express';
import { createTickets, deleteTicketById, fineUpdateTicketsByID, getTicketsByReporterId, updateTicketTitleById } from '../services/ticket.service';
import { SUCCESS_MESSAGES } from '../constants/success.constant'
import { AuthRequest } from '../schemas/authSchemas';
import { TicketStatus, CreateTicket as CreateTicketSchema, GetTicketByID } from '../schemas/ticket.schema';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/AppError';
import { canCreateTicket, canGetTicket, canUpdateTicket } from '../utils/ticketPolicy';
const { CREATED, FETCHED } = SUCCESS_MESSAGES.TICKET

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { reporter: reporterID } = req.body as CreateTicketSchema;

    if (!canCreateTicket(req.user!, reporterID)) {
        throw new AppError(
            'FORBIDDEN',
            'You are not allowed to create a ticket for another user.',
            StatusCodes.FORBIDDEN
        );
    }

    const task = await createTickets(req.body);
    res.locals.data = { ticekt: task };
    res.locals.message = CREATED.message;
    next()
};

export const getTicketsByReporter = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { reporterId } = req.params as GetTicketByID;

        if (!canGetTicket(req.user!, reporterId)) {
            throw new AppError(
                'FORBIDDEN',
                'You are not allowed to get a ticket for another user.',
                StatusCodes.FORBIDDEN
            );
        }

        const tickets = await getTicketsByReporterId({ reporterId })

        res.locals.data = { tickets: tickets };
        res.locals.message = FETCHED.message;
        next()
    } catch (error) {
        next(error)
    }
};

export const updateTicketState = async (req: AuthRequest, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { newState }: { newState: TicketStatus } = req.body;

    if (!canUpdateTicket(req.user!, id)) {
        throw new AppError(
            'FORBIDDEN',
            'You are not allowed to update a ticket status for another user.',
            StatusCodes.FORBIDDEN
        );
    }

    const ticket = await fineUpdateTicketsByID({ id, newState })

    res.locals.data = { ticket: ticket };
    res.locals.message = FETCHED.message;
    next()

};

export const updateTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title }: { title: string } = req.body;


    if (!canUpdateTicket(req.user!, id)) {
        throw new AppError(
            'FORBIDDEN',
            'You are not allowed to update a ticket for another user.',
            StatusCodes.FORBIDDEN
        );
    }

    const ticket = await updateTicketTitleById({ id, title })

    res.locals.data = { ticket: ticket };
    res.locals.message = FETCHED.message;
    next()

};


export const deleteTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;


    if (!canUpdateTicket(req.user!, id)) {
        throw new AppError(
            'FORBIDDEN',
            'You are not allowed to delete a ticket for another user.',
            StatusCodes.FORBIDDEN
        );
    }

    const ticket = await deleteTicketById(id);

    res.locals.data = { ticket };
    res.locals.message = "Ticket deleted successfully";
    next();
};


