import { Router } from "express";
import {
  getMyProfileController,
  getUsersController,
} from "#controllers/index.controller.js";
import { authenticate } from "#middlewares/auth.middleware.js";

const userRouter: Router = Router();

userRouter.get("/list-users", authenticate, getUsersController);
userRouter.get("/my-profile", authenticate, getMyProfileController);

export default userRouter;
