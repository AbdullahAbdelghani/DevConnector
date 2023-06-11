import { Post, transformPost } from "../utiles/models";
import { PostType } from "../../../models/Post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { addAlert } from "./alert";

export interface PostState {
  posts: Post[] | null;
  post: Post | null;
  loading: Boolean;
  error?: {
    msg: string;
    status: number;
  };
}

const initialState: PostState = {
  posts: [],
  post: null,
  loading: true,
  error: undefined,
};

// create Post Action
export const createPostAsync = createAsyncThunk<
  void,
  { text: string; id: string },
  { rejectValue: AxiosError }
>("post/create", async ({ text, id }, { dispatch }) => {
  const postData = { text, id };
  const body = JSON.stringify(postData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  await axios.post("api/posts", body, config);
  dispatch(getPostsAsync());
  addAlert(dispatch, { msg: "Post Created", alertType: "success" });
});

// Get All Posts Action
export const getPostsAsync = createAsyncThunk<
  Post[],
  undefined,
  { rejectValue: AxiosError }
>("post/get/all", async () => {
  const res = await axios.get<PostType[]>("/api/posts");
  return res.data.map((post) => transformPost(post));
});

// Get Post By ID Action
export const getPostByIdAsync = createAsyncThunk<
  Post,
  { postId: string },
  { rejectValue: AxiosError }
>("post/get:id", async ({ postId }) => {
  const res = await axios.get<PostType>(`/api/posts/${postId}`);
  return transformPost(res.data);
});

// Add Comment Action
export const addCommentAsync = createAsyncThunk<
  Post,
  { postId: string; text: string },
  { rejectValue: AxiosError }
>("post/add/comment", async ({ postId, text }, { dispatch }) => {
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
  addAlert(dispatch, { msg: "Comment Added", alertType: "success" });
  return transformPost(res.data);
});

// Like Post Action
export const likePostAsync = createAsyncThunk<
  void,
  { id: string },
  { rejectValue: AxiosError }
>("post/like", async ({ id }, { dispatch }) => {
  await axios.put(`/api/posts/like/${id}`);
  dispatch(getPostsAsync());
});

// Unlike Post Action
export const unlikePostAsync = createAsyncThunk<
  void,
  { postId: string },
  { rejectValue: AxiosError }
>("post/unlike", async ({ postId }, { dispatch }) => {
  await axios.put(`/api/posts/unlike/${postId}`);
  dispatch(getPostsAsync());
});

// Delete Comment Action
export const deleteCommentAsync = createAsyncThunk<
  void,
  { postId: string; commentId: string },
  { rejectValue: AxiosError }
>("post/delete/comment", async ({ postId, commentId }, { dispatch }) => {
  await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
  dispatch(getPostByIdAsync({ postId }));
  addAlert(dispatch, { msg: "Comment Deleted", alertType: "success" });
});

// Delete Post Action
export const deletePostAsync = createAsyncThunk<
  void,
  { postId: string },
  { rejectValue: AxiosError }
>("post/delete", async ({ postId }, { dispatch }) => {
  await axios.delete(`/api/posts/${postId}`);
  dispatch(getPostsAsync());
  addAlert(dispatch, { msg: "Post Deleted", alertType: "success" });
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Post
    builder.addCase(createPostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPostAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPostAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Get All Posts
    builder.addCase(getPostsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostsAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Get Post By Id
    builder.addCase(getPostByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostByIdAsync.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostByIdAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Add Comment
    builder.addCase(addCommentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Like Post
    builder.addCase(likePostAsync.pending, (state) => {
      //state.loading = true;
    });
    builder.addCase(likePostAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(likePostAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Unlike Post
    builder.addCase(unlikePostAsync.pending, (state) => {
      //state.loading = true;
    });
    builder.addCase(unlikePostAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(unlikePostAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Delete Comment
    builder.addCase(deleteCommentAsync.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(deleteCommentAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCommentAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });

    // Delete Post
    builder.addCase(deletePostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePostAsync.rejected, (state, action) => {
      if (action.payload) {
        console.error(action.payload.message);
        state.error = {
          msg: action.payload.response?.statusText
            ? action.payload.response?.statusText
            : "Server Error",
          status: action.payload.response?.status
            ? action.payload.response?.status
            : 500,
        };
        state.posts = null;
        state.post = null;
        state.loading = false;
      }
    });
  },
});
