import { Schema, Document, model } from "mongoose";

export type CommentType = {
  user: Schema.Types.ObjectId | string;
  text: string;
  name: string;
  avatar: string;
  date: Date;
};

export interface PostType extends Document {
  user: Schema.Types.ObjectId | string;
  text: string;
  name: string;
  avatar: string;
  likes: {
    user: string | Schema.Types.ObjectId;
  }[];
  comments: CommentType[];
  date: Date;
}

const PostSchema = new Schema<PostType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Post = model<PostType>("post", PostSchema);
