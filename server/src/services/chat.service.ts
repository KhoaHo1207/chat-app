import type { CreateChatSchemaType } from "#validations/index.validation.js";
import { UserModel, ChatModel, MessageModel } from "#models/index.model.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "#utils/app-error.js";

const PARTICIPANT_SELECT = "name avatar email";
const MESSAGE_REPLY_SELECT = "content image sender isDeleted createdAt";

const buildDirectChatKey = (userId: string, participantId: string) =>
  [userId, participantId].sort().join(":");

const createDirectChat = async (userId: string, participantId: string) => {
  if (participantId === userId) {
    throw new BadRequestError("Cannot create a chat with yourself");
  }

  const otherUser = await UserModel.findById(participantId);
  if (!otherUser) {
    throw new NotFoundError("User not found");
  }

  const directChatKey = buildDirectChatKey(userId, participantId);

  const existingChat = await ChatModel.findOne({
    isGroup: false,
    directChatKey,
  }).populate("participants", PARTICIPANT_SELECT);

  if (existingChat) {
    return { chat: existingChat, isNew: false };
  }

  try {
    const chat = await ChatModel.create({
      participants: [userId, participantId],
      isGroup: false,
      directChatKey,
      createdBy: userId,
    });

    await chat.populate("participants", PARTICIPANT_SELECT);

    return { chat, isNew: true };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const raceChat = await ChatModel.findOne({
        isGroup: false,
        directChatKey,
      }).populate("participants", PARTICIPANT_SELECT);

      if (raceChat) {
        return { chat: raceChat, isNew: false };
      }
    }

    throw error;
  }
};

const createGroupChat = async (
  userId: string,
  data: Extract<CreateChatSchemaType, { isGroup: true }>
) => {
  const uniqueOtherIds = [
    ...new Set(data.participants.filter((id) => id !== userId)),
  ];

  if (uniqueOtherIds.length < 1) {
    throw new BadRequestError(
      "Group chat must have at least one other participant"
    );
  }

  const users = await UserModel.find({ _id: { $in: uniqueOtherIds } });
  if (users.length !== uniqueOtherIds.length) {
    throw new NotFoundError("One or more participants not found");
  }

  const allParticipantIds = [userId, ...uniqueOtherIds];

  const chat = await ChatModel.create({
    participants: allParticipantIds,
    isGroup: true,
    groupName: data.groupName,
    createdBy: userId,
  });

  await chat.populate("participants", PARTICIPANT_SELECT);

  return { chat, isNew: true };
};

export const createChatService = async (
  userId: string,
  data: CreateChatSchemaType
) => {
  if (data.isGroup) {
    return createGroupChat(userId, data);
  }

  return createDirectChat(userId, data.participantId);
};

export const getChatsService = async (userId: string) => {
  const chats = await ChatModel.find({
    participants: { $in: [userId] },
  })
    .populate("participants", PARTICIPANT_SELECT)
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: PARTICIPANT_SELECT,
      },
    })
    .sort({ updatedAt: -1 })
    .lean();

  return chats;
};

export const getChatService = async (chatId: string, userId: string) => {
  const chat = await ChatModel.findById(chatId).populate(
    "participants",
    PARTICIPANT_SELECT
  );

  if (!chat) {
    throw new NotFoundError("Chat not found");
  }

  const isParticipant = chat.participants.some(
    (participant) => participant._id.toString() === userId
  );

  if (!isParticipant) {
    throw new ForbiddenError("You are not a participant of this chat");
  }

  const messages = await MessageModel.find({
    chatId,
    isDeleted: false,
  })
    .populate("sender", PARTICIPANT_SELECT)
    .populate({
      path: "replyTo",
      select: MESSAGE_REPLY_SELECT,
      populate: {
        path: "sender",
        select: PARTICIPANT_SELECT,
      },
    })
    .sort({ createdAt: 1 })
    .lean();

  return { chat, messages };
};
