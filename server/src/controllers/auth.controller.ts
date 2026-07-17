import type { Request, Response } from "express";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "#validations/index.validation.js";
import { registerService, loginService } from "#services/index.service.js";
import { HTTP_STATUS_CODES } from "#config/http.config.js";
import { clearJwtAuthCookie, setJwtAuthCookie } from "#utils/cookie.js";
import { successResponse } from "#utils/success-response.js";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as RegisterSchemaType;
    const user = await registerService(body);

    return successResponse({
      res,
      statusCode: HTTP_STATUS_CODES.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as LoginSchemaType;
    const user = await loginService(body);

    setJwtAuthCookie({
      res,
      userId: String(user._id),
    });

    return successResponse({
      res,
      message: "Login successful",
      data: { user },
    });
  }
);

export const logoutController = asyncHandler(
  async (_req: Request, res: Response) => {
    clearJwtAuthCookie(res);

    return successResponse({
      res,
      message: "Logout successful",
      data: null,
    });
  }
);
