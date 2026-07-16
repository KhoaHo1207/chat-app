import { Router } from "express";
import { getMyProfileController } from "#controllers/user.controller.js";
import { authenticate } from "#middlewares/auth.middleware.js";

const userRouter: Router = Router();

userRouter.get("/my-profile", authenticate, getMyProfileController);

export default userRouter;
