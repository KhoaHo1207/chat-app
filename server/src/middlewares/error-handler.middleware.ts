import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from "#config/http.config.js";
import { AppError } from "#utils/app-error.js";
import { type ErrorRequestHandler } from "express";

export const errorhandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log(`Error occured: ${req.path}`, error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      error: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
    error: error.message,
  });
};
