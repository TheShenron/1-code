import express, { RequestHandler } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { authorizeRole } from '../middlewares/authorizeRole.middleware';
import { Role } from '../schemas/authSchemas';
import { createUserDailySnapshot } from '../controllers/snapshot.controller';
import { createSnapshotSchema } from '../schemas/snapshot.schema';

const router = express.Router();

const protectedApiMiddleware: RequestHandler[] = [
    // generalApiLimiter,
    verifyToken,
];

router.use(protectedApiMiddleware)

// router.get('/', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ params: getTicketByIDSchema }), getTicketsByReporter);
router.post('/', authorizeRole(Role.ADMIN, Role.USER), validateRequest({ body: createSnapshotSchema }), createUserDailySnapshot);

export default router;
