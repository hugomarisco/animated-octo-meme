import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ reason: "Not found" });

  next();
};
