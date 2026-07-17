import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestValidationTarget = "body" | "query" | "params";

export const validateSchema = <T>(
  schema: ZodType<T>,
  target: RequestValidationTarget = "body"
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed as (typeof req)[typeof target];
      next();
    } catch (error) {
      next(error);
    }
  };
};
