import {
  loginController,
  logoutController,
  registerController,
} from "#controllers/index.controller.js";
import { validateSchema } from "#middlewares/validate-schema.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "#validations/index.validation.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  registerController
);
authRouter.post("/login", validateSchema(loginSchema), loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
