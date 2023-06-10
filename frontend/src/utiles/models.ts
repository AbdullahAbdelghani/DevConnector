import { UserType } from "../../../models/User";
import { ProfileType } from "../../../models/Profile";
import { PostType } from "../../../models/Post";

// Generic section:
// - adds id to a type declartion
export type WithId<RawType extends Object> = RawType & { id: string };
// - gets the id value of from a backend type
function transformId<T extends { id?: string; _id?: string }>(raw: T): string {
  const id = raw.id || raw._id;
  if (id === undefined) {
    throw new TypeError("Invalid Id");
  }
  return id;
}

// User Section:
// - User Type
export type User = WithId<
  Pick<UserType, "name" | "email" | "password" | "avatar" | "date">
>;
// - User transform from the beackend type to the frontend type
export function transformUser(rawUser: UserType): User {
  return {
    avatar: rawUser.avatar,
    date: rawUser.date,
    name: rawUser.name,
    email: rawUser.email,
    password: rawUser.password,
    id: transformId(rawUser),
  };
}

// Profile Section:
// - Profile Type
export type Profile = WithId<
  Pick<
    ProfileType,
    | "user"
    | "company"
    | "website"
    | "location"
    | "status"
    | "skills"
    | "bio"
    | "githubusername"
    | "experience"
    | "education"
    | "social"
    | "date"
  >
>;
// - Profile transform from the beackend type to the frontend type
export function transformProfile(rawProfile: ProfileType): Profile {
  return {
    user: rawProfile.user,
    company: rawProfile.company,
    website: rawProfile.website,
    location: rawProfile.location,
    status: rawProfile.status,
    skills: rawProfile.skills,
    bio: rawProfile.bio,
    githubusername: rawProfile.githubusername,
    experience: rawProfile.experience,
    education: rawProfile.education,
    social: rawProfile.social,
    date: rawProfile.date,
    id: transformId(rawProfile),
  };
}

// Post Section:
// - Post Type
export type Post = WithId<
  Pick<PostType, "user" | "text" | "name" | "avatar" | "date">
>;
// - Post transform from the beackend type to the frontend type
export function transformPost(rawPost: PostType): Post {
  return {
    user: rawPost.user,
    text: rawPost.text,
    name: rawPost.name,
    avatar: rawPost.avatar,
    date: rawPost.date,
    id: transformId(rawPost),
  };
}
