import type { Request, Response } from "express";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import type { CreateChatSchemaType } from "#validations/chat.validation.js";
import { createChatService, getChatsService } from "#services/chat.service.js";
import { successResponse } from "#utils/success-response.js";
import { HTTP_STATUS_CODES } from "#config/http.config.js";
import { UnauthorizedError } from "#utils/app-error.js";

export const createChatController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userId = req.user._id.toString();
    const data = req.body as CreateChatSchemaType;
    const { chat, isNew } = await createChatService(userId, data);

    return successResponse({
      res,
      message: isNew ? "Chat created successfully" : "Chat already exists",
      data: { chat },
      statusCode: isNew ? HTTP_STATUS_CODES.CREATED : HTTP_STATUS_CODES.OK,
    });
  }
);

export const getChatsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError("Unauthorized");
    }

    const chats = await getChatsService(req.user._id.toString());
    return successResponse({
      res,
      message: "Get chats successful",
      data: chats,
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);
