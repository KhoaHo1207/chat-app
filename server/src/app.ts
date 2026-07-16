import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Env } from "#config/env.config.js";
import { errorhandler } from "#middlewares/error-handler.middleware.js";
import { notFoundHandler } from "#middlewares/not-found.middleware.js";
import authRouter from "#routes/auth.route.js";

const app: Express = express();

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundHandler);
app.use(errorhandler);

export default app;
