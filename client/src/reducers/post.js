import { CREATE_POST, GET_POST, GET_POSTS, POST_ERROR } from "../actions/types";
const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST:
    case GET_POSTS:
    case GET_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        posts: null,
        loading: false,
      };
    default:
      return state;
  }
}
