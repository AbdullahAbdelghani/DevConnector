import { Profile, transformProfile } from "../utiles/models";
import { ProfileType } from "../../../models/Profile";
import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  ProfileTypes,
} from "../actions/types";

export interface ProfileState {
  profile: Profile | null;
  profiles: Profile[];
  repos: Object[];
  loading: boolean;
  error: Object;
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

type GetCreateUpdateProfile = {
  type:
    | Extract<ProfileTypes, "GET_PROFILE">
    | Extract<ProfileTypes, "CREATE_PROFILE">
    | Extract<ProfileTypes, "UPDATE_PROFILE">;
  payload: ProfileType;
};

type GetProfiles = {
  type: Extract<ProfileTypes, "GET_PROFILES">;
  payload: ProfileType[];
};

type GetRepos = {
  type: Extract<ProfileTypes, "GET_REPOS">;
  payload: Object[];
};

type ProfileError = {
  type: Extract<ProfileTypes, "PROFILE_ERROR">;
  payload: {
    msg?: string;
    status?: number;
  };
};

type ClearProfile = {
  type: Extract<ProfileTypes, "CLEAR_PROFILE">;
};

type Action =
  | GetCreateUpdateProfile
  | GetProfiles
  | GetRepos
  | ProfileError
  | ClearProfile;

export default function (
  state: ProfileState = initialState,
  action: Action
): ProfileState {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: transformProfile(action.payload),
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload.map((profile) => transformProfile(profile)),
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        profile: null,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: [],
        error: [],
      };
    default:
      return state;
  }
}
