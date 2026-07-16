import {
  HTTP_STATUS_CODES,
  type HTTP_STATUS_CODE_TYPE,
} from "#config/http.config.js";
import type { Response } from "express";

export type SuccessResponseBody<T = unknown> = {
  success: true;
  message: string;
  data: T;
};

type SuccessResponseOptions<T> = {
  res: Response;
  message: string;
  data?: T;
  statusCode?: HTTP_STATUS_CODE_TYPE;
};

export const successResponse = <T = null>({
  res,
  message,
  data = null as T,
  statusCode = HTTP_STATUS_CODES.OK,
}: SuccessResponseOptions<T>) => {
  const body: SuccessResponseBody<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(body);
};
