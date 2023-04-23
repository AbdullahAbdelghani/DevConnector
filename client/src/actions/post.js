import axios from "axios";
import { POST_ERROR, GET_POST, GET_POSTS, CREATE_POST } from "./types";
import { setAlert } from "./alert";

export const createPost = (text, id, navigate) => async (dispatch) => {
  const postData = { text, id };
  try {
    const body = JSON.stringify(postData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("api/posts", body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
    navigate("/dashboard");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
