import { NextFunction, Response } from 'express';
import { AuthRequest, TicketState } from '../types/ticket.type';
import { createTickets, fineUpdateTicketsByID, getTicketsByReporterId } from '../services/ticket.service';
import { SUCCESS_MESSAGES } from '../constants/success.constant'
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
    const { newState }: { newState: TicketState } = req.body;

    const ticket = await fineUpdateTicketsByID({ id, newState })

    res.locals.data = { ticket: ticket };
    res.locals.message = FETCHED.message;
    next()

};


