import { GET_POST, GET_POSTS, POST_ERROR, PostTypes } from "../actions/types";
import { Post, transformPost } from "../utiles/models";
import { PostType } from "../../../models/Post";

export interface PostState {
  posts: Post[] | null;
  post: Post | null;
  loading: Boolean;
  error: Object;
}

const initialState: PostState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

type GetPosts = {
  type: Extract<PostTypes, "GET_POSTS">;
  payload: PostType[];
};

type GetPost = {
  type: Extract<PostTypes, "GET_POST">;
  payload: PostType;
};

type PostError = {
  type: Extract<PostTypes, "POST_ERROR">;
  payload: {
    msg?: string;
    status?: number;
  };
};

type Action = GetPosts | GetPost | PostError;

export default function (
  state: PostState = initialState,
  action: Action
): PostState {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.map((post) => transformPost(post)),
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: transformPost(action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        posts: null,
        post: null,
        loading: false,
      };
    default:
      return state;
  }
}
