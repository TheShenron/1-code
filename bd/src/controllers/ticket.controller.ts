import { Request, Response } from 'express';
import Ticket, { TicketState } from '../models/Ticket.model';

export const createTicket = async (req: Request, res: Response) => {
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

    if (previousState === 'inprogress' && newState !== 'inprogress') {
        const lastUpdated = task.updatedAt || task.createdAt;
        const now = new Date();
        const durationMs = now.getTime() - lastUpdated.getTime();
        const timeSpent = parseFloat((durationMs / 60000).toFixed(2));
        task.timeSpentInProgress += timeSpent;
    }

    task.currentState = newState;
    await task.save();
    res.json({ message: 'Task updated', task });
};

export const getTicketById = async (req: Request, res: Response) => {
    try {
        const task = await Ticket.findById(req.params.id)
            .populate('reporter', 'name email');
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch task', details: err });
    }
};

export const getTicketsByReporter = async (req: Request, res: Response) => {
    try {
        const { reporterId } = req.params;

        const tickets = await Ticket.find({ reporter: reporterId })
            .populate('reporter', 'name email');

        res.json({ data: tickets });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tickets', details: err });
    }
};
