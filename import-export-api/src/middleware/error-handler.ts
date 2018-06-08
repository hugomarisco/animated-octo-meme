import { NextFunction, Request, Response } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    let statusCode: number;

    switch (err.name) {
      case "ValidationError":
        statusCode = 422;
        break;
      default:
        statusCode = 500;
    }

    res.status(statusCode).json({ reason: err.message });
  }

  next();
};
