import mongoose, { Document, Schema } from "mongoose";

export interface MessageDocument extends Document {
  chatId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content?: string | null;
  image?: string | null;
  replyTo?: mongoose.Types.ObjectId | null;
  isRead: boolean;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre("validate", function () {
  if (!this.content && !this.image) {
    this.invalidate("content", "Message content or image is required");
  }
});

messageSchema.index({ chatId: 1, createdAt: 1 });

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;
