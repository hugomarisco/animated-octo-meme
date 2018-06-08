import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors";
import ExportJob from "../models/export-job";

const EXPORT_JOB_TYPES = ["epub", "pdf"];

/**
 * POST /export-jobs
 * Creates a new export job
 */
export let create = (req: Request, res: Response, next: NextFunction) => {
  const { book_id : bookId, type } = req.body;

  // validation
  if (!bookId) {
    return next(new ValidationError("'book_id' is a required field"));
  }
  if (typeof bookId !== "string") {
    return next(new ValidationError("'book_id' must be a string"));
  }
  if (!type) {
    return next(new ValidationError("'type' is a required field"));
  }
  if (EXPORT_JOB_TYPES.indexOf(type) < 0) {
    return next(new ValidationError(`'type' must be one of the following: ${EXPORT_JOB_TYPES.join(", ")}`));
  }

  // Create and store a new import job
  const job = new ExportJob(bookId, type);

  req.app.locals.exportJobs.push(job);

  // Respond to the HTTP request
  res.status(201).json(job.toJSON());
};

/**
 * GET /export-jobs
 * List all export jobs
 */
export let list = (req: Request, res: Response) => {
  const jobs = req.app.locals.exportJobs.map((j: ExportJob) => j.toJSON());

  res.json(jobs);
};
