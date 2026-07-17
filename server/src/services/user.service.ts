import { UserModel } from "#models/index.model.js";

const USER_PUBLIC_SELECT = "name avatar email";

export const getUsersService = async (userId: string) => {
  const users = await UserModel.find({
    _id: { $ne: userId },
  })
    .select(USER_PUBLIC_SELECT)
    .lean();

  return users;
};
