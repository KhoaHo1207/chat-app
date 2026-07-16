export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_STATUS_MESSAGES = {
  OK: "OK",
  CREATED: "Created",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
} as const;

export type HTTP_STATUS_CODE_TYPE =
  (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];
export type HTTP_STATUS_MESSAGE_TYPE =
  (typeof HTTP_STATUS_MESSAGES)[keyof typeof HTTP_STATUS_MESSAGES];
