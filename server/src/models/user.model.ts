import { compareValue } from "./../utils/bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        if (ret) {
          delete (ret as any).password;
        }
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await hashValue(this.password as string);
  }
  next();
});

userSchema.methods.compareValue = async function (value: string) {
  return compareValue(value, this.password as string);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
