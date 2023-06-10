import axios, { AxiosError, AxiosResponse } from "axios";
import { POST_ERROR, GET_POST, GET_POSTS } from "./types";
import { setAlert } from "./alert";
import { PostType } from "../../../models/Post";

export const createPost =
  (text: string, id: string) =>
  async (dispatch: any): Promise<void> => {
    const postData = { text, id };
    try {
      const body = JSON.stringify(postData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post("api/posts", body, config);
      dispatch(getPosts());
      dispatch(setAlert("Post Created", "success"));
    } catch (error) {
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const getPosts =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<PostType[]> = await axios.get("/api/posts");
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const getPostById =
  (postId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<PostType> = await axios.get(
        `/api/posts/${postId}`
      );
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const addComment =
  (postId: string, text: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const body = JSON.stringify({ text });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put<PostType>(
        `/api/posts/comment/${postId}`,
        body,
        config
      );
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
      dispatch(setAlert("Comment Added", "success"));
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const likePost =
  (id: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      await axios.put(`/api/posts/like/${id}`);
      dispatch(getPosts());
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const unlikePost =
  (postId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      await axios.put(`/api/posts/unlike/${postId}`);
      dispatch(getPosts());
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const deleteComment =
  (postId: string, commentId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch(getPostById(postId));
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const deletePost =
  (postId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch(getPosts());
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };
