import express, { RequestHandler } from 'express';
import { createTicket, getTicketsByReporter, updateTicketState } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { generalApiLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { createTicketSchema, getTicketByIDSchema, updateTicketStateParamSchema, updateTicketStateSchema } from '../schemas/ticket.schema';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

router.post('/', validateRequest({ body: createTicketSchema }), createTicket);
router.get('/reporter/:reporterId', validateRequest({ params: getTicketByIDSchema }), getTicketsByReporter);
router.patch('/:id/state', validateRequest({ body: updateTicketStateSchema, params: updateTicketStateParamSchema }), updateTicketState);



export default router;
