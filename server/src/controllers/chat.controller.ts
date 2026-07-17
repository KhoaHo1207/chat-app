import type { Request, Response } from "express";
import type {
  ChatIdSchemaType,
  CreateChatSchemaType,
} from "#validations/index.validation.js";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import {
  createChatService,
  getChatService,
  getChatsService,
} from "#services/chat.service.js";
import { successResponse } from "#utils/success-response.js";
import { HTTP_STATUS_CODES } from "#config/http.config.js";

export const createChatController = asyncHandler(
  async (req: Request, res: Response) => {
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
    const chats = await getChatsService(req.user._id.toString());

    return successResponse({
      res,
      message: "Chats fetched successfully",
      data: { chats },
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);

export const getChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as ChatIdSchemaType;
    const { chat, messages } = await getChatService(
      id,
      req.user._id.toString()
    );

    return successResponse({
      res,
      message: "Chat fetched successfully",
      data: { chat, messages },
      statusCode: HTTP_STATUS_CODES.OK,
    });
  }
);
