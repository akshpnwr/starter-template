import express from 'express';
import userRouter from './router/user.router';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

app.all('/api/auth/*', toNodeHandler(auth));

app.use(express.json());

app.use('/api/users', userRouter);

export default app;
