import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  avatar: z.string().default(""),
});

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
