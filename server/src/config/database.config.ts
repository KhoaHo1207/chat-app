import mongoose from "mongoose";
import { Env } from "#config/env.config.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
