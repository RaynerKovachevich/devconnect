import "reflect-metadata"; // required for class-transformer/class-validator decorators
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import userRouter from "./controllers/userContoller";
import authRouter from "./controllers/authController";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger / OpenAPI
const openApiPath = path.resolve(process.cwd(), "docs/openapi.yaml");
const openApiDocument = YAML.parse(readFileSync(openApiPath, "utf8"));

// Swagger UI en /docs
  app.use(
    '/docs',
    (req: Request, _res: Response, next: NextFunction) => {
      console.log(`[docs] ${req.method} ${req.originalUrl}`);
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, { explorer: true })
  );

// Endpoint para descargar YAML
app.get("/docs/openapi.yaml", (_req: Request, res: Response) => {
  res.sendFile(openApiPath);
});

// Routers
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Health check
app.get("/health", (_req: Request, res: Response) => res.json({ status: "ok" }));

// Error handler
app.use(errorHandler);

// Start server
const port = Number(process.env.PORT) || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
