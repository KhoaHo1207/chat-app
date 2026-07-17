import { Router } from "express";
import {
  createChatController,
  getChatsController,
} from "#controllers/index.controller.js";
import { authenticate } from "#middlewares/auth.middleware.js";
import { validateSchema } from "#middlewares/validate-schema.middleware.js";
import { createChatSchema } from "#validations/index.validation.js";

const router: Router = Router();

router.post(
  "/",
  authenticate,
  validateSchema(createChatSchema),
  createChatController
);

router.get("/", authenticate, getChatsController);

export default router;
