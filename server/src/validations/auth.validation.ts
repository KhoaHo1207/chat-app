import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  avatar: z.string().trim().optional().default(""),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
