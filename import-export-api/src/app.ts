import bodyParser from "body-parser";
import express, { Application } from "express";
import morgan from "morgan";

// Middleware
import errorHandler from "./middleware/error-handler";
import pageNotFoundHandler from "./middleware/page-not-found-handler";

// Controllers (route handlers)
import * as exportJobsController from "./controllers/export-jobs";
import * as importJobsController from "./controllers/import-jobs";

// Job models
import ExportJob from "./models/export-job";
import ImportJob from "./models/import-job";

// Create Express server
const app: Application = express();

// Logger
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("common"));
}

// Attach in-memory data stores
app.locals.importJobs = new Array<ImportJob>();
app.locals.exportJobs = new Array<ExportJob>();

// Express configuration
app.use(bodyParser.json());

// App routes
app.post("/export-jobs", exportJobsController.create);
app.get("/export-jobs", exportJobsController.list);
app.post("/import-jobs", importJobsController.create);
app.get("/import-jobs", importJobsController.list);

// Page not found handler
app.use(pageNotFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
