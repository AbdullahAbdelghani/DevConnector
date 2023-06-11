import { Schema, Document, model } from "mongoose";

export type ExperienceType = {
  title: string;
  company: string;
  location: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
};

export type EducationType = {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
};

export type SocialType = {
  facebook: string;
  youtube: string;
  twitter: string;
  instagram: string;
  linkedin: string;
};

export interface ProfileType extends Document {
  user: Schema.Types.ObjectId | string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  githubusername: string;
  experience: ExperienceType[];
  education: EducationType[];
  social: SocialType;
  date: Date;
}

const ProfileSchema = new Schema<ProfileType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    facebook: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export const Profile = model<ProfileType>("profile", ProfileSchema);
