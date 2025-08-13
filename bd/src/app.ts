import express, { Application, Response, Request } from 'express';
import cors from 'cors';

import { responseWrapper } from './middlewares/responseWrapper.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

// Create express app
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
// app.use(cors({
//     origin: process.env.CORS_ORIGIN || '*', // CORS setup
//     credentials: true,
// }));
app.use(cors())
app.set('trust proxy', 1);

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import ticketRoutes from './routes/ticket.routes';

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', environment: process.env.NODE_ENV });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ticket', ticketRoutes);

// Global error handler (optional)
app.use(responseWrapper);
app.use(errorHandler);

export default app;
