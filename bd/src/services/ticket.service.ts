import TicketModel from "../models/Ticket.model";
import { CreateTicketDTO, GetTicketsByIdDTO, GetTicketsByReporterDTO, ITicket, } from "../types/ticket.type";

export const createTickets = async (data: CreateTicketDTO): Promise<ITicket> => {
    const ticket = new TicketModel(data);
    return ticket.save();
};

export const getTicketsByReporterId = async (
    data: GetTicketsByReporterDTO
): Promise<(ITicket & { timeSpentInProgress?: number })[]> => {
    const { reporterId } = data;
    return await TicketModel.find({ reporter: reporterId }).populate('reporter', 'name email');;
};

export const findTicketsByID = async (data: GetTicketsByIdDTO): Promise<ITicket> => {
    const ticket = await TicketModel.findById(data.id);

    if (!ticket) {
        throw new Error('Ticket not found');
    }
    return ticket.save();
};

export const updateTicketState = async (
    ticketId: string,
    data: UpdateTicketStateInput
) => {
    const ticket = await TicketModel.findById(ticketId);

    if (!ticket) {
        throw new Error('Ticket not found');
    }

    const now = dayjs();

    // ⏱️ If leaving "inprogress", calculate and add time spent
    if (ticket.currentState === 'inprogress') {
        const startedAt = dayjs(ticket.currentStateStartedAt);
        const elapsedSeconds = now.diff(startedAt, 'second');

        ticket.set('timeSpentInProgress', (ticket.get('timeSpentInProgress') ?? 0) + elapsedSeconds);
    }

    ticket.currentState = data.newState;
    ticket.currentStateStartedAt = now.toDate();
    ticket.statusHistory.push({
        state: data.newState,
        enteredAt: now.toDate(),
    });

    await ticket.save();

    return ticket;
};
