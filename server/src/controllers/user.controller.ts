import { HTTP_STATUS_CODES } from "#config/http.config.js";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import { getUsersService } from "#services/user.service.js";
import { successResponse } from "#utils/success-response.js";
import { type Request, type Response } from "express";

export const getMyProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    return successResponse({
      res,
      message: "Profile fetched successfully",
      data: { user: req.user },
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);

export const getUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getUsersService(req.user._id.toString());

    return successResponse({
      res,
      message: "Users fetched successfully",
      data: { users },
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);
