import { UserModel } from "#models/index.model.js";
import { ConflictError, UnauthorizedError } from "#utils/app-error.js";
import { compareValue } from "#utils/bcrypt.js";
import {
  type LoginSchemaType,
  type RegisterSchemaType,
} from "#validations/index.validation.js";

export const registerService = async (data: RegisterSchemaType) => {
  const isUserExisted = await UserModel.findOne({ email: data.email });
  if (isUserExisted) {
    throw new ConflictError("User already exists");
  }

  const newUser = await UserModel.create(data);
  return newUser.toJSON();
};

export const loginService = async (data: LoginSchemaType) => {
  const user = await UserModel.findOne({ email: data.email }).select(
    "+password"
  );

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isPasswordValid = await compareValue(data.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  return user.toJSON();
};
