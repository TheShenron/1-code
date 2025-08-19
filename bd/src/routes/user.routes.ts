import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { signupLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { signupSchema } from '../schemas/authSchemas';

const router = Router();

// router.use(signupLimiter)

router.post('/', validateRequest({ body: signupSchema }), createUser);

export default router;
