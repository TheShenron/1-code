import { Router } from 'express';
import { createUser, getAllUser } from '../controllers/user.controller';
import { signupLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { Role, signupSchema } from '../schemas/authSchemas';
import { authorizeRole } from '../middlewares/authorizeRole.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// router.use(signupLimiter)

router.post('/', validateRequest({ body: signupSchema }), createUser);
router.get('/', verifyToken, authorizeRole(Role.ADMIN, Role.USER), getAllUser);


export default router;
