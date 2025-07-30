import express from 'express';
import { createTicket, getTicketById, getTicketsByReporter, updateTicketState } from '../controllers/ticket.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createTicket);
router.patch('/:id/state', verifyToken, updateTicketState);
router.get('/:id', verifyToken, getTicketById);
router.get('/reporter/:reporterId', verifyToken, getTicketsByReporter);



export default router;
