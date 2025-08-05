import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/ticket.type';
import { createTickets, getTicketsByReporterId } from '../services/ticket.service';
import { SUCCESS_MESSAGES } from '../constants/success.constant'
import dayjs from 'dayjs';
const { CREATED, FETCHED } = SUCCESS_MESSAGES.TICKET


export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const task = await createTickets(req.body);
        res.locals.data = { ticekt: task };
        res.locals.message = CREATED.message;
        next()
    } catch (error) {
        next(error)
    }
};

export const getTicketsByReporter = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { reporterId } = req.params;

        const tickets = await getTicketsByReporterId({ reporterId })
        const now = dayjs();

        const T = tickets.map((ticket) => {
            if (ticket.currentState === 'inprogress') {
                const startedAt = dayjs(ticket.currentStateStartedAt);
                const elapsedSeconds = now.diff(startedAt, 'second');

                return {
                    ...ticket,
                    timeSpentInProgress: elapsedSeconds,
                };
            }

            return ticket;
        });

        res.locals.data = { tickets: T };
        res.locals.message = FETCHED.message;
        next()
    } catch (error) {
        next(error)
    }
};

// export const updateTicketState = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { newState }: { newState: TicketState } = req.body;

//     const task = await Ticket.findById(id);
//     if (!task) {
//         res.status(404).json({ error: 'Task not found' });
//         return
//     }

//     const previousState = task.currentState;

//     if (previousState !== 'inprogress' && newState === 'inprogress') {
//         task.inProgressStartedAt = new Date();
//     }

//     if (previousState === 'inprogress' && newState !== 'inprogress') {
//         const lastUpdated = task.inProgressStartedAt || task.updatedAt || task.createdAt;
//         const now = new Date();
//         const durationMs = now.getTime() - lastUpdated.getTime();
//         const timeSpent = parseFloat((durationMs / 60000).toFixed(2));
//         task.timeSpentInProgress += timeSpent;
//         task.inProgressStartedAt = null;
//     }

//     task.currentState = newState;
//     await task.save();
//     res.json({ message: 'Task updated', task });
// };

// // export const getTicketById = async (req: Request, res: Response) => {
// //     try {
// //         const task = await Ticket.findById(req.params.id)
// //             .populate('reporter', 'name email');
// //         if (!task) {
// //             res.status(404).json({ error: 'Task not found' });
// //             return
// //         }
// //         res.json(task);
// //     } catch (err) {
// //         res.status(500).json({ error: 'Failed to fetch task', details: err });
// //     }
// // };

// export const getTicketById = async (req: Request, res: Response) => {
//     try {
//         const task = await Ticket.findById(req.params.id)
//             .populate('reporter', 'name email');

//         if (!task) {
//             res.status(404).json({ error: 'Task not found' });
//             return
//         }

//         let dynamicTimeSpent = task.timeSpentInProgress;

//         if (task.currentState === 'inprogress' && task.inProgressStartedAt) {
//             const now = new Date();
//             const elapsed = (now.getTime() - task.inProgressStartedAt.getTime()) / 60000;
//             dynamicTimeSpent += elapsed;
//         }

//         res.json({
//             ...task.toObject(),
//             dynamicTimeSpent: parseFloat(dynamicTimeSpent.toFixed(2)), // total minutes
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch task', details: err });
//     }
// };


