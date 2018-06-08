import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors";
import ImportJob from "../models/import-job";

const IMPORT_JOB_TYPES = ["word", "pdf", "wattpad", "evernote"];
const URL_RE = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

/**
 * POST /import-jobs
 * Creates a new import job
 */
export let create = (req: Request, res: Response, next: NextFunction) => {
  const { book_id : bookId, type, url } = req.body;

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
  if (IMPORT_JOB_TYPES.indexOf(type) < 0) {
    return next(new ValidationError(`'type' must be one of the following: ${IMPORT_JOB_TYPES.join(", ")}`));
  }
  if (!url) {
    return next(new ValidationError("'url' is a required field"));
  }
  if (!URL_RE.test(url)) {
    return next(new ValidationError("'url' must be a valid URL"));
  }

  // Create and store a new import job
  const job = new ImportJob(bookId, type, url);

  req.app.locals.importJobs.push(job);

  // Respond to the HTTP request
  res.status(201).json(job.toJSON());
};

/**
 * GET /import-jobs
 * List all import jobs
 */
export let list = (req: Request, res: Response) => {
  const jobs = req.app.locals.importJobs.map((j: ImportJob) => j.toJSON());

  res.json(jobs);
};
