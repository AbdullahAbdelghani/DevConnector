import { combineReducers } from "redux";
import alert, { Alert } from "./alert";
import auth, { AuthState } from "./auth";
import profile, { ProfileState } from "./profile";
import post, { PostState } from "./post";
export type GlobalStateType = {
  auth: AuthState;
  profile: ProfileState;
  post: PostState;
  alert: Alert[];
};
export default combineReducers({ alert, auth, profile, post });
