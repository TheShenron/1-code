import { NextFunction, Response } from 'express';
import { createTickets, deleteTicketById, fineUpdateTicketsByID, getTicketsByReporterId, updateTicketTitleById } from '../services/ticket.service';
import { SUCCESS_MESSAGES } from '../constants/success.constant'
import { AuthRequest } from '../schemas/authSchemas';
import { TicketStatus } from '../schemas/ticket.schema';
const { CREATED, FETCHED } = SUCCESS_MESSAGES.TICKET


export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const task = await createTickets(req.body);
    res.locals.data = { ticekt: task };
    res.locals.message = CREATED.message;
    next()
};

export const getTicketsByReporter = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { reporterId } = req.params;

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

    const ticket = await fineUpdateTicketsByID({ id, newState })

    res.locals.data = { ticket: ticket };
    res.locals.message = FETCHED.message;
    next()

};

export const updateTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title }: { title: string } = req.body;

    const ticket = await updateTicketTitleById({ id, title })

    res.locals.data = { ticket: ticket };
    res.locals.message = FETCHED.message;
    next()

};


export const deleteTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const ticket = await deleteTicketById(id);

    res.locals.data = { ticket };
    res.locals.message = "Ticket deleted successfully";
    next();
};


