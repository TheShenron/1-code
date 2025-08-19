import express, { RequestHandler } from 'express';
import { createTicket, deleteTicket, getTicketsByReporter, updateTicket, updateTicketState } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { generalApiLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { createTicketSchema, getTicketByIDSchema, updateTicketSchema, updateTicketStateParamSchema, updateTicketStateSchema } from '../schemas/ticket.schema';
import { authorizeRole } from '../middlewares/authorizeRole.middleware';
import { Role } from '../schemas/authSchemas';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    // generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

router.post('/', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ body: createTicketSchema }), createTicket);
router.get('/reporter/:reporterId', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ params: getTicketByIDSchema }), getTicketsByReporter);
router.patch('/:id/state', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ body: updateTicketStateSchema, params: updateTicketStateParamSchema }), updateTicketState);
router.patch('/:id/update', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ body: updateTicketSchema, params: updateTicketStateParamSchema }), updateTicket);
router.patch('/:id/delete', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ params: updateTicketStateParamSchema }), deleteTicket);

export default router;
