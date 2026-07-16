import UserModel, { type UserDocument } from "#models/user.model.js";
import { ConflictError, UnauthorizedError } from "#utils/app-error.js";
import { compareValue } from "#utils/bcrypt.js";
import {
  type LoginSchemaType,
  type RegisterSchemaType,
} from "#validations/auth.validation.js";

export const registerService = async (data: RegisterSchemaType) => {
  console.log(data);
  const isUserExisted = await UserModel.findOne({ email: data.email });
  if (isUserExisted) {
    throw new ConflictError("User already exists");
  }
  const newUser = new UserModel({
    ...data,
  });
  await newUser.save();

  return newUser;
};

export const loginService = async (data: LoginSchemaType) => {
  const user: UserDocument = await UserModel.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isPasswordValid = await compareValue(data.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  return user;
};
