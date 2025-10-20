import "reflect-metadata"; // required for class-transformer/class-validator decorators
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./controllers/userContoller";
import authRouter from "./controllers/authController";

// Initialize Express app, load env, register middleware and routes; export app so tests can import it without starting the server.
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

// Basic error handler - catches errors from route handlers and returns a 500.
// For production, improve this to log errors and hide internals.
app.use((err: any, req: Request, res: Response, next: any) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
