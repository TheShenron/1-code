import { Request, Response } from 'express';
import Ticket from '../models/Ticket.model';
import { AuthRequest, TicketState } from '../types/ticket.type';

export const createTicket = async (req: AuthRequest, res: Response) => {
    try {
        const task = new Ticket(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err });
    }
};

export const updateTicketState = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newState }: { newState: TicketState } = req.body;

    const task = await Ticket.findById(id);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return
    }

    const previousState = task.currentState;

    if (previousState !== 'inprogress' && newState === 'inprogress') {
        task.inProgressStartedAt = new Date();
    }

    if (previousState === 'inprogress' && newState !== 'inprogress') {
        const lastUpdated = task.inProgressStartedAt || task.updatedAt || task.createdAt;
        const now = new Date();
        const durationMs = now.getTime() - lastUpdated.getTime();
        const timeSpent = parseFloat((durationMs / 60000).toFixed(2));
        task.timeSpentInProgress += timeSpent;
        task.inProgressStartedAt = null;
    }

    task.currentState = newState;
    await task.save();
    res.json({ message: 'Task updated', task });
};

// export const getTicketById = async (req: Request, res: Response) => {
//     try {
//         const task = await Ticket.findById(req.params.id)
//             .populate('reporter', 'name email');
//         if (!task) {
//             res.status(404).json({ error: 'Task not found' });
//             return
//         }
//         res.json(task);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch task', details: err });
//     }
// };

export const getTicketById = async (req: Request, res: Response) => {
    try {
        const task = await Ticket.findById(req.params.id)
            .populate('reporter', 'name email');

        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return
        }

        let dynamicTimeSpent = task.timeSpentInProgress;

        if (task.currentState === 'inprogress' && task.inProgressStartedAt) {
            const now = new Date();
            const elapsed = (now.getTime() - task.inProgressStartedAt.getTime()) / 60000;
            dynamicTimeSpent += elapsed;
        }

        res.json({
            ...task.toObject(),
            dynamicTimeSpent: parseFloat(dynamicTimeSpent.toFixed(2)), // total minutes
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch task', details: err });
    }
};


// export const getTicketsByReporter = async (req: Request, res: Response) => {
//     try {
//         const { reporterId } = req.params;

//         const tickets = await Ticket.find({ reporter: reporterId })
//             .populate('reporter', 'name email');

//         if (!tickets) {
//             res.status(404).json({ error: 'Task not found' });
//             return
//         }

//         let dynamicTimeSpent = tickets;

//         if (tickets.currentState === 'inprogress' && tickets.inProgressStartedAt) {
//             const now = new Date();
//             const elapsed = (now.getTime() - tickets.inProgressStartedAt.getTime()) / 60000;
//             dynamicTimeSpent += elapsed;
//         }

//         res.json({
//             ...tickets.toObject(),
//             dynamicTimeSpent: parseFloat(dynamicTimeSpent.toFixed(2)), // total minutes
//         });

//         // res.json({ data: tickets });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch tickets', details: err });
//     }
// };

export const getTicketsByReporter = async (req: Request, res: Response) => {
    try {
        const { reporterId } = req.params;

        const tasks = await Ticket.find({ reporter: reporterId })
            .populate('reporter', 'name email');

        // Enhance each task with dynamic time spent
        const enrichedTasks = tasks.map((task) => {
            let dynamicTimeSpent = task.timeSpentInProgress;

            if (task.currentState === 'inprogress' && task.inProgressStartedAt) {
                const now = new Date();
                const elapsed = (now.getTime() - task.inProgressStartedAt.getTime()) / 60000;
                dynamicTimeSpent += elapsed;
            }

            return {
                ...task.toObject(),
                dynamicTimeSpent: parseFloat(dynamicTimeSpent.toFixed(2)),
            };
        });

        res.json(enrichedTasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: err });
    }
};


