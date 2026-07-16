import { HTTP_STATUS_CODES } from "#config/http.config.js";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import { successResponse } from "#utils/success-response.js";
import { type Request, type Response } from "express";

export const getMyProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    return successResponse({
      res,
      message: "Get my profile successful",
      data: req.user,
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);
