import { NotFoundError } from "#utils/app-error.js";
import type { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};
