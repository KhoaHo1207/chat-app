import type { CreateChatSchemaType } from "#validations/index.validation.js";
import { UserModel, ChatModel } from "#models/index.model.js";
import { BadRequestError, NotFoundError } from "#utils/app-error.js";

const PARTICIPANT_SELECT = "name avatar email";

const createDirectChat = async (userId: string, participantId: string) => {
  if (participantId === userId) {
    throw new BadRequestError("Cannot create a chat with yourself");
  }

  const otherUser = await UserModel.findById(participantId);
  if (!otherUser) {
    throw new NotFoundError("User not found");
  }

  const existingChat = await ChatModel.findOne({
    isGroup: false,
    participants: { $all: [userId, participantId], $size: 2 },
  }).populate("participants", PARTICIPANT_SELECT);

  if (existingChat) {
    return { chat: existingChat, isNew: false };
  }

  const chat = await ChatModel.create({
    participants: [userId, participantId],
    isGroup: false,
    createdBy: userId,
  });

  await chat.populate("participants", PARTICIPANT_SELECT);

  return { chat, isNew: true };
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
