import express, { RequestHandler } from 'express';
import { createTicket, getTicketsByReporter } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { generalApiLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { createTicketSchema } from '../schemas/ticket.schema';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

router.post('/', validateRequest({ body: createTicketSchema }), createTicket);
router.get('/reporter/:reporterId', getTicketsByReporter);
router.patch('/:id/state', updateTicketState);
// router.get('/:id', getTicketById);



export default router;
