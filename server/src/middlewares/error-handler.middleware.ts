import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from "#config/http.config.js";
import { AppError, ErrorCodes } from "#utils/app-error.js";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorhandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
): void => {
  console.log(`Error occured: ${req.path}`, error);

  if (error instanceof ZodError) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      error: ErrorCodes.ERR_VALIDATION,
      details: error.issues.map((issue) => ({
        field: issue.path.length > 0 ? issue.path.join(".") : "body",
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.errorCode,
    });
    return;
  }

  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
    error: ErrorCodes.ERR_INTERNAL_SERVER_ERROR,
  });
};
