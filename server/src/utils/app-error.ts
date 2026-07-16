import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
  type HTTP_STATUS_CODE_TYPE,
} from "#config/http.config.js";

export const ErrorCodes = {
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
  ERR_CONFLICT: "ERR_CONFLICT",
  ERR_VALIDATION: "ERR_VALIDATION",
  ERR_INTERNAL_SERVER_ERROR: "ERR_INTERNAL_SERVER_ERROR",
} as const;
export type ErrorCodeType = keyof typeof ErrorCodes;

export class AppError extends Error {
  constructor(
    success: boolean,
    message: string,
    public statusCode: HTTP_STATUS_CODE_TYPE = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCodeType = ErrorCodes.ERR_INTERNAL_SERVER_ERROR
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR) {
    super(
      false,
      message,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      ErrorCodes.ERR_INTERNAL_SERVER_ERROR
    );
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.BAD_REQUEST) {
    super(
      false,
      message,
      HTTP_STATUS_CODES.BAD_REQUEST,
      ErrorCodes.ERR_BAD_REQUEST
    );
  }
}

export class ConflictError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.CONFLICT) {
    super(false, message, HTTP_STATUS_CODES.CONFLICT, ErrorCodes.ERR_CONFLICT);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.UNAUTHORIZED) {
    super(
      false,
      message,
      HTTP_STATUS_CODES.UNAUTHORIZED,
      ErrorCodes.ERR_UNAUTHORIZED
    );
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.FORBIDDEN) {
    super(
      false,
      message,
      HTTP_STATUS_CODES.FORBIDDEN,
      ErrorCodes.ERR_FORBIDDEN
    );
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = HTTP_STATUS_MESSAGES.NOT_FOUND) {
    super(
      false,
      message,
      HTTP_STATUS_CODES.NOT_FOUND,
      ErrorCodes.ERR_NOT_FOUND
    );
  }
}
