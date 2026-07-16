import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Env } from "#config/env.config.js";
import { asyncHandler } from "#middlewares/async-handler.middleware.js";
import UserModel from "#models/user.model.js";
import { UnauthorizedError } from "#utils/app-error.js";

type AccessTokenPayload = {
  userId: string;
};

const isAccessTokenPayload = (value: unknown): value is AccessTokenPayload => {
  return (
    typeof value === "object" &&
    value !== null &&
    "userId" in value &&
    typeof (value as { userId: unknown }).userId === "string"
  );
};

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken as string | undefined;

    if (!token) {
      throw new UnauthorizedError("Authentication token is missing");
    }

    let decoded: unknown;

    try {
      decoded = jwt.verify(token, Env.JWT_SECRET, {
        audience: Env.JWT_AUDIENCE,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError("Authentication token has expired");
      }

      throw new UnauthorizedError("Invalid authentication token");
    }

    if (!isAccessTokenPayload(decoded)) {
      throw new UnauthorizedError("Invalid authentication token");
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;
    next();
  }
);
