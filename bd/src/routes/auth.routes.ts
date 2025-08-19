import express from 'express';
import { login } from '../controllers/auth.controller';
import { loginLimiter } from '../middlewares/rateLimiters.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { loginSchema } from '../schemas/authSchemas';

const router = express.Router();

// router.use(loginLimiter)

router.post('/login', validateRequest({ body: loginSchema }), login);


export default router;
