import { Router } from "express";
import {
  createChatController,
  getChatController,
  getChatsController,
} from "#controllers/index.controller.js";
import { authenticate } from "#middlewares/auth.middleware.js";
import { validateSchema } from "#middlewares/validate-schema.middleware.js";
import {
  chatIdSchema,
  createChatSchema,
} from "#validations/index.validation.js";

const chatRouter: Router = Router();

chatRouter.post(
  "/",
  authenticate,
  validateSchema(createChatSchema),
  createChatController
);

chatRouter.get("/", authenticate, getChatsController);

chatRouter.get(
  "/:id",
  authenticate,
  validateSchema(chatIdSchema, "params"),
  getChatController
);

export default chatRouter;
