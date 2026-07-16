import type { Request, Response } from "express";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import { loginSchema, registerSchema } from "#validations/auth.validation.js";
import { registerService, loginService } from "#services/auth.service.js";
import { HTTP_STATUS_CODES } from "#config/http.config.js";
import { clearJwtAuthCookie, setJwtAuthCookie } from "#utils/cookie.js";
import { successResponse } from "#utils/success-response.js";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);
    const user = await registerService(body);

    return successResponse({
      res,
      statusCode: HTTP_STATUS_CODES.CREATED,
      message: "User registered successfully",
      data: user,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const user = await loginService(body);

    setJwtAuthCookie({
      res,
      userId: user._id.toString(),
    });

    return successResponse({
      res,
      message: "Login successful",
      data: user,
    });
  }
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    clearJwtAuthCookie(res);

    return successResponse({
      res,
      message: "Logout successful",
      data: null,
    });
  }
);
