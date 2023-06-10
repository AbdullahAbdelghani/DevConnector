import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTHENTICATION_EROR,
  LOGOUT,
  ACCOUNT_DELETED,
  AuthTypes,
} from "../actions/types";
import { UserType } from "../../../models/User";
import { User, transformUser } from "../utiles/models";

export interface AuthState {
  token: String | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

export type LoadUser = {
  type: Extract<AuthTypes, "USER_LOADED">;
  payload: UserType;
};

export type Success = {
  type:
    | Extract<AuthTypes, "LOGIN_SUCCESS">
    | Extract<AuthTypes, "REGISTER_SUCCESS">;
  payload: {
    token: string;
  };
};

type Fail = {
  type:
    | Extract<AuthTypes, "REGISTER_FAIL">
    | Extract<AuthTypes, "LOGIN_FAIL">
    | Extract<AuthTypes, "AUTHENTICATION_EROR">
    | Extract<AuthTypes, "LOGOUT">
    | Extract<AuthTypes, "ACCOUNT_DELETED">;
};

type Action = Success | LoadUser | Fail;

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (
  state: AuthState = initialState,
  action: Action
): AuthState {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: transformUser(action.payload),
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTHENTICATION_EROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
