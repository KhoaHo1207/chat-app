import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validators/auth.validator";
import { registerService } from "../services/auth.service";
import { setJwtAuthCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http.config";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);
    const user = await registerService(body);

    const userId = user._id.toString();

    return setJwtAuthCookie({
      res,
      userId,
    })
      .status(HTTPSTATUS.CREATED)
      .json({
        message: "User created & login successfully",
        user,
      });
  }
);
