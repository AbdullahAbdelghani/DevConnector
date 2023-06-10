// import { Post, transformPost } from "../utiles/models";
// import { PostType } from "../../../models/Post";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";
// import { WritableDraft } from "immer/dist/internal";
// import { useAppDispatch, useAppSelector } from "../config/GlobalStateConfig";
// import { alertAsync } from "./alert";

// export interface PostState {
//   posts: Post[] | null;
//   post: Post | null;
//   loading: Boolean;
//   error?: {
//     msg: string;
//     status: number;
//   };
// }

// const initialState: PostState = {
//   posts: [],
//   post: null,
//   loading: true,
//   error: undefined,
// };

// const handleError = (state: WritableDraft<PostState>, action: AxiosError) => {
//   console.error(action.message);
//   state = {
//     ...state,
//     error: {
//       msg: action.response?.statusText
//         ? action.response?.statusText
//         : "Server Error",
//       status: action.response?.status ? action.response?.status : 500,
//     },
//     posts: null,
//     post: null,
//     loading: false,
//   };
// };

// // create Post Action
// const createPostAsync = createAsyncThunk<
//   void,
//   { text: string; id: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ text, id }) => {
//   const postData = { text, id };
//   const body = JSON.stringify(postData);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   await axios.post("api/posts", body, config);
// });

// // Get All Posts Action
// const getPostsAsync = createAsyncThunk<
//   PostState,
//   {},
//   { rejectValue: AxiosError }
// >("post/create", async () => {
//   const res = await axios.get<PostType[]>("/api/posts");
//   const state = useAppSelector((state) => state.post);
//   return {
//     ...state,
//     posts: res.data.map((post) => transformPost(post)),
//   };
// });

// // Get Post By ID Action
// const getPostByIdAsync = createAsyncThunk<
//   PostState,
//   { postId: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ postId }) => {
//   const res = await axios.get<PostType>(`/api/posts/${postId}`);
//   const state = useAppSelector((state) => state.post);
//   return {
//     ...state,
//     post: transformPost(res.data),
//   };
// });

// // Add Comment Action
// const addCommentAsync = createAsyncThunk<
//   PostState,
//   { postId: string; text: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ postId, text }) => {
//   const body = JSON.stringify({ text });
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await axios.put<PostType>(
//     `/api/posts/comment/${postId}`,
//     body,
//     config
//   );
//   const state = useAppSelector((state) => state.post);
//   return {
//     ...state,
//     post: transformPost(res.data),
//   };
// });

// // Like Post Action
// const likePostAsync = createAsyncThunk<
//   void,
//   { id: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ id }) => {
//   await axios.put(`/api/posts/like/${id}`);
// });

// // Unlike Post Action
// const unlikePostAsync = createAsyncThunk<
//   void,
//   { postId: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ postId }) => {
//   await axios.put(`/api/posts/unlike/${postId}`);
// });

// // Delete Comment Action
// const deleteCommentAsync = createAsyncThunk<
//   void,
//   { postId: string; commentId: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ postId, commentId }) => {
//   await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
// });

// // Delete Post Action
// const deletePostAsync = createAsyncThunk<
//   void,
//   { postId: string },
//   { rejectValue: AxiosError }
// >("post/create", async ({ postId }) => {
//   await axios.delete(`/api/posts/${postId}`);
// });

// export const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Create Post
//     builder.addCase(createPostAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(createPostAsync.fulfilled, (state) => {
//       const dispatch = useAppDispatch();
//       dispatch(getPostsAsync);
//       dispatch(alertAsync({ msg: "Post Created", alertType: "success" }));
//       state.loading = false;
//     });
//     builder.addCase(createPostAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Get All Posts
//     builder.addCase(getPostsAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getPostsAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getPostsAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Get Post By Id
//     builder.addCase(getPostByIdAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getPostByIdAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getPostByIdAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Add Comment
//     builder.addCase(addCommentAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(addCommentAsync.fulfilled, (state) => {
//       const dispatch = useAppDispatch();
//       dispatch(alertAsync({ msg: "Comment Added", alertType: "success" }));
//       state.loading = false;
//     });
//     builder.addCase(addCommentAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Like Post
//     builder.addCase(likePostAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(likePostAsync.fulfilled, (state) => {
//       const dispatch = useAppDispatch();
//       dispatch(getPostsAsync);
//       state.loading = false;
//     });
//     builder.addCase(likePostAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Unlike Post
//     builder.addCase(unlikePostAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(unlikePostAsync.fulfilled, (state) => {
//       const dispatch = useAppDispatch();
//       dispatch(getPostsAsync);
//       state.loading = false;
//     });
//     builder.addCase(unlikePostAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Delete Comment
//     builder.addCase(deleteCommentAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
//       const dispatch = useAppDispatch();
//       dispatch(getPostByIdAsync({ postId: action.meta.arg.postId }));
//       state.loading = false;
//     });
//     builder.addCase(deleteCommentAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });

//     // Delete Post
//     builder.addCase(deletePostAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(deletePostAsync.fulfilled, (state) => {
//       const dispatch = useAppDispatch();
//       dispatch(getPostsAsync);
//       state.loading = false;
//     });
//     builder.addCase(deletePostAsync.rejected, (state, action) => {
//       if (action.payload) {
//         handleError(state, action.payload);
//       }
//     });
//   },
// });
export const x = "h";
