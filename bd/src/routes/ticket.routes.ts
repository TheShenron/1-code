import express, { RequestHandler } from 'express';
import { createTicket, getTicketById, getTicketsByReporter, updateTicketState } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { generalApiLimiter } from '../middlewares/rateLimiters.middleware';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

router.post('/', createTicket);
router.patch('/:id/state', updateTicketState);
router.get('/:id', getTicketById);
router.get('/reporter/:reporterId', getTicketsByReporter);



export default router;
