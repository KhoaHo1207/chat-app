import { Env } from "#config/env.config.js";
import type { CookieOptions } from "express";
import ms from "ms";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: Env.NODE_ENV === "production",
  sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
};

export const jwtCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: ms(Env.JWT_EXPIRES_IN as Time) || ms("15m"),
};

export const clearJwtCookieOptions: CookieOptions = {
  ...baseCookieOptions,
};
