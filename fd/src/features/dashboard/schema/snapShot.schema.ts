import z from 'zod';
import { ticketSchema } from './tickect.schema';

export const createSnapshotSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  ticketIds: z
    .array(z.string().min(1, 'ticketId must be a non-empty string'))
    .nonempty('ticketIds must contain at least one ID'),
});
export type CreateSnapshot = z.infer<typeof createSnapshotSchema>;

export const createSnapshotResp = z.object({
  data: z.object({
    snapshot: z.object({
      date: z.string(),
      userId: z.string(),
      _id: z.string(),
      tickets: z.array(ticketSchema),
    }),
  }),
  success: z.boolean(),
  message: z.string(),
});

export type CreateSnapshotResp = z.infer<typeof createSnapshotResp>;
