import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Id is required" })
  .refine((id) => mongoose.isValidObjectId(id), {
    message: "Invalid id format",
  });

export const createChatSchema = z.discriminatedUnion("isGroup", [
  z.object({
    isGroup: z.literal(false),
    participantId: objectIdSchema,
  }),
  z.object({
    isGroup: z.literal(true),
    groupName: z.string().trim().min(1, { message: "Group name is required" }),
    participants: z
      .array(objectIdSchema)
      .min(1, { message: "At least one participant is required" }),
  }),
]);

export const chatIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;
export type ChatIdSchemaType = z.infer<typeof chatIdSchema>;

export { objectIdSchema };
