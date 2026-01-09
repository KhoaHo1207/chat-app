import "dotenv/config";

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import connectDatabase from "./config/database.config";
import routes from "./routes";

import "./config/passport.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(passport.initialize());

app.get("/", (req, res) => {
  return res.send("Con me mày");
});

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Server is healthy",
      status: "OK",
    });
  })
);
app.use("/api", routes);
app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT}`);
});

export default app;
