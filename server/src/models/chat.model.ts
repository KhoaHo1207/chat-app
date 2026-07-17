import mongoose, { Document, Schema } from "mongoose";

export interface ChatDocument extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId | null;
  isGroup: boolean;
  groupName?: string | null;
  directChatKey?: string | null;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<ChatDocument>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: null,
    },
    directChatKey: {
      type: String,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ participants: 1, updatedAt: -1 });
chatSchema.index(
  { directChatKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isGroup: false,
      directChatKey: { $type: "string" },
    },
  }
);

const ChatModel = mongoose.model<ChatDocument>("Chat", chatSchema);

export default ChatModel;
