import express, { RequestHandler } from 'express';
import { createTicket, deleteTicket, getTicketsByReporter, updateTicket, updateTicketState } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { generalApiLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { createTicketSchema, getTicketByIDSchema, updateTicketSchema, updateTicketStateParamSchema, updateTicketStateSchema } from '../schemas/ticket.schema';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

router.post('/', validateRequest({ body: createTicketSchema }), createTicket);
router.get('/reporter/:reporterId', validateRequest({ params: getTicketByIDSchema }), getTicketsByReporter);
router.patch('/:id/state', validateRequest({ body: updateTicketStateSchema, params: updateTicketStateParamSchema }), updateTicketState);
router.patch('/:id/update', validateRequest({ body: updateTicketSchema, params: updateTicketStateParamSchema }), updateTicket);
router.patch('/:id/delete', validateRequest({ params: updateTicketStateParamSchema }), deleteTicket);

export default router;
