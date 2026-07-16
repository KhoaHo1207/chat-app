import {
  clearJwtCookieOptions,
  jwtCookieOptions,
} from "#config/cookie.config.js";
import { Env } from "#config/env.config.js";
import type { Response } from "express";
import jwt from "jsonwebtoken";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
type Cookie = {
  res: Response;
  userId: string;
};

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
  const payload = { userId };
  const expiresIn = Env.JWT_EXPIRES_IN as Time;

  const token = jwt.sign(payload, Env.JWT_SECRET, {
    audience: Env.JWT_AUDIENCE,
    expiresIn: (expiresIn as Time) || "15m",
  });

  return res.cookie("accessToken", token, jwtCookieOptions);
};

export const clearJwtAuthCookie = (res: Response) => {
  return res.clearCookie("accessToken", clearJwtCookieOptions);
};
