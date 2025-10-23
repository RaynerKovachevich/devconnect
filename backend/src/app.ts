import express, { Express, Request, Response } from "express";
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
let openApiDocument: Record<string, unknown> | null = null;

try {
  openApiDocument = YAML.parse(readFileSync(openApiPath, "utf8")) as Record<string, unknown>;
} catch (err) {
  console.warn('Swagger spec not loaded:', err);
}

if (openApiDocument) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument, { explorer: true }));
}

// Endpoint para descargar YAML
app.get("/docs/openapi.yaml", (_req: Request, res: Response) => {
  res.sendFile(openApiPath, err => {
    if (err) {
      res.status(404).json({ message: "OpenAPI spec not found" });
    }
  });
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
