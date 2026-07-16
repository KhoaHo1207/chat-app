import {
  loginController,
  logoutController,
  registerController,
} from "#controllers/auth.controller.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
