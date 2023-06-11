import { Schema, model, Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  password: string;
  email: string;
  avatar: string;
  date: Date;
}

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<UserType>("user", UserSchema);
