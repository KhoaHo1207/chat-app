import { UserModel } from "#models/index.model.js";

export const getUsersService = async (userId: string) => {
  const users = await UserModel.find({
    _id: {
      $ne: userId,
    },
  })
    .select("-password")
    .lean();

  return users;
};
