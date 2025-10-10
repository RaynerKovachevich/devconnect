import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./controllers/userContoller";

// Initialize Express app, load env, register middleware and routes; export app so tests can import it without starting the server.
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
