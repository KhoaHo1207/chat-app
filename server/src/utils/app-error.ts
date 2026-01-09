import { HTTPSTATUS, HttpStatusCode } from "../config/http.config";

export const ErrorCodes = {
  ERROR_INTERNAL: "ERROR_INTERNAL",
  ERROR_BAD_REQUEST: "ERROR_BAD_REQUEST",
  ERROR_UNAUTHORIZED: "ERROR_UNAUTHORIZED",
  ERROR_FORBIDDEN: "ERROR_FORBIDDEN",
  ERROR_NOT_FOUND: "ERROR_NOT_FOUND",
  ERROR_CONFLICT: "ERROR_CONFLICT",
  ERROR_UNPROCESSABLE_ENTITY: "ERROR_UNPROCESSABLE_ENTITY",
  ERROR_TOO_MANY_REQUESTS: "ERROR_TOO_MANY_REQUESTS",
  ERROR_BAD_GATEWAY: "ERROR_BAD_GATEWAY",
  ERROR_SERVICE_UNAVAILABLE: "ERROR_SERVICE_UNAVAILABLE",
} as const;

export type ErrorCodeType = keyof typeof ErrorCodes;

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HttpStatusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCodeType = ErrorCodes.ERROR_INTERNAL
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerException extends AppError {
  constructor(message: string = "Internal Server Error") {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, ErrorCodes.ERROR_INTERNAL);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, HTTPSTATUS.BAD_REQUEST, ErrorCodes.ERROR_BAD_REQUEST);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, HTTPSTATUS.UNAUTHORIZED, ErrorCodes.ERROR_UNAUTHORIZED);
  }
}

export class ForbiddenException extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, HTTPSTATUS.FORBIDDEN, ErrorCodes.ERROR_FORBIDDEN);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string = "Not Found") {
    super(message, HTTPSTATUS.NOT_FOUND, ErrorCodes.ERROR_NOT_FOUND);
  }
}

export class ConflictException extends AppError {
  constructor(message: string = "Conflict") {
    super(message, HTTPSTATUS.CONFLICT, ErrorCodes.ERROR_CONFLICT);
  }
}

export class UnprocessableEntityException extends AppError {
  constructor(message: string = "Unprocessable Entity") {
    super(
      message,
      HTTPSTATUS.UNPROCESSABLE_ENTITY,
      ErrorCodes.ERROR_UNPROCESSABLE_ENTITY
    );
  }
}

export class TooManyRequestsException extends AppError {
  constructor(message: string = "Too Many Requests") {
    super(
      message,
      HTTPSTATUS.TOO_MANY_REQUESTS,
      ErrorCodes.ERROR_TOO_MANY_REQUESTS
    );
  }
}

export class BadGatewayException extends AppError {
  constructor(message: string = "Bad Gateway") {
    super(message, HTTPSTATUS.BAD_GATEWAY, ErrorCodes.ERROR_BAD_GATEWAY);
  }
}

export class ServiceUnavailableException extends AppError {
  constructor(message: string = "Service Unavailable") {
    super(
      message,
      HTTPSTATUS.SERVICE_UNAVAILABLE,
      ErrorCodes.ERROR_SERVICE_UNAVAILABLE
    );
  }
}
