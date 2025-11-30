import express, { json, urlencoded } from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logger
import logger from "./config/logger.js";

// Database
import { connectionToDatabase } from "./utils/db-util.js";

// Middleware
import apiLogger from "./middleware/api-logger.js";
import errorHandler from "./middleware/error-handler.js";
import responseBuilder from "./middleware/response-builder.js";
import auth from "./middleware/auth.js";

// Routes
import apiRoutes from "./route/index.js";

// Seed
import { seedInitialData } from "./seed/index.js";

// Express setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(apiLogger);
app.use(responseBuilder);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(auth);

// Routes
app.use("/api", apiRoutes);

// Global error handler
app.use(errorHandler);

// Connection to database
await connectionToDatabase();

// Seed initial data
await seedInitialData();

// Start server
app.listen(port, () => logger.info(`It is alive on http://localhost:${port}`));

export default app;
