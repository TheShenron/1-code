import { z } from "zod";
import { createdTicketResp } from "./ticket.schema";

export const createSnapshotSchema = z.object({
    userId: z.string().min(1, "userId is required"),
    ticketIds: z.array(z.string().min(1, "ticketId must be a non-empty string")).nonempty("ticketIds must contain at least one ID"),
});
export type CreateSnapshot = z.infer<typeof createSnapshotSchema>;

export const createSnapshotResp = z.object({
    _id: z.string(),
    userId: z.string(),
    date: z.date(),
    tickets: z.array(createdTicketResp),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CreateSnapshotResp = z.infer<typeof createSnapshotResp>;
