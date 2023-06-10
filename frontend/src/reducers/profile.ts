// import { Profile, transformProfile } from "../utiles/models";
// import { ProfileType } from "../../../models/Profile";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";
// import {
//   useAppDispatch,
//   useAppSelector,
//   AppDispatch,
// } from "../config/GlobalStateConfig";
// import { NavigateFunction } from "react-router-dom";
// import { alertAsync } from "./alert";
// import { WritableDraft } from "immer/dist/internal";
// import { authSlice } from "./auth";

// export type ProfileState = {
//   profile: Profile | null;
//   profiles: Profile[];
//   repos: Object[];
//   loading: boolean;
//   error?: {
//     msg: string;
//     status: number;
//   };
// };

// type ProfileCreationForm = {
//   company: string;
//   website: string;
//   location: string;
//   bio: string;
//   status: string;
//   githubusername: string;
//   skills: string;
//   facebook: string;
//   youtube: string;
//   twitter: string;
//   instagram: string;
//   linkedin: string;
// };

// type ExperienceCreationForm = {
//   company: string;
//   title: string;
//   location: string;
//   from: Date;
//   to?: Date;
//   current: boolean;
//   description: string;
// };

// type EducationCreationForm = {
//   school: string;
//   degree: string;
//   fieldofstudy: string;
//   from: Date;
//   to?: Date;
//   current: boolean;
//   description: string;
// };

// const initialState: ProfileState = {
//   profile: null,
//   profiles: [],
//   repos: [],
//   loading: true,
//   error: undefined,
// };

// const handleError = (
//   state: WritableDraft<ProfileState>,
//   action: AxiosError<{ errors: { msg: string }[] }>,
//   dispatch: AppDispatch
// ) => {
//   if (action.response?.data.errors) {
//     const errors: { msg: string }[] = action.response?.data.errors;
//     errors.forEach((error) => {
//       dispatch(alertAsync({ msg: error.msg, alertType: "danger" }));
//     });
//   }
//   state = {
//     ...state,
//     error: {
//       msg: action.response?.statusText
//         ? action.response?.statusText
//         : "Server Error",
//       status: action.response?.status ? action.response?.status : 500,
//     },
//     profile: null,
//     loading: false,
//   };
// };

// // Get Current Profile Action
// export const getCurrentProfileAsync = createAsyncThunk<
//   ProfileState,
//   {},
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async () => {
//   const res = await axios.get<ProfileType>("/api/profile/me");
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Get Profile By Id Action
// export const getProfileByIdAsync = createAsyncThunk<
//   ProfileState,
//   { userId: string },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async (params) => {
//   const res = await axios.get<ProfileType>(
//     `/api/profile/user/${params.userId}`
//   );
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Get All Profiles Action
// export const getProfilesAsync = createAsyncThunk<
//   ProfileState,
//   {},
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async () => {
//   const res = await axios.get<ProfileType[]>("/api/profile");
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profiles: res.data.map((profile) => transformProfile(profile)),
//   };
// });

// // Get Github Repos Action
// export const getReposAsync = createAsyncThunk<
//   ProfileState,
//   { username: string },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ username }) => {
//   const res = await axios.get<Object[]>(`/api/profile/github/${username}`);
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     repos: res.data,
//   };
// });

// // Create or Update Profile Action
// export const createUpdateProfileAsync = createAsyncThunk<
//   ProfileState,
//   {
//     profileData: ProfileCreationForm;
//     navigate: NavigateFunction;
//     edit?: boolean;
//   },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ profileData, navigate, edit = false }) => {
//   const state = useAppSelector((state) => state.profile);
//   const body = JSON.stringify(profileData);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await axios.post<ProfileType>("api/profile", body, config);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Add Experience Action
// export const addExperienceAsync = createAsyncThunk<
//   ProfileState,
//   { formData: ExperienceCreationForm; navigate: NavigateFunction },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ formData, navigate }) => {
//   const body = JSON.stringify(formData);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await axios.put<ProfileType>(
//     "api/profile/experience",
//     body,
//     config
//   );
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Add Education Action
// export const addEducationAsync = createAsyncThunk<
//   ProfileState,
//   { formData: EducationCreationForm; navigate: NavigateFunction },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ formData, navigate }) => {
//   const body = JSON.stringify(formData);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await axios.put<ProfileType>(
//     "api/profile/education",
//     body,
//     config
//   );
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Delete Education Action
// export const deleteEducationAsync = createAsyncThunk<
//   ProfileState,
//   { id: string },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ id }) => {
//   const res = await axios.delete<ProfileType>(`api/profile/education/${id}`);
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Delete Experience Action
// export const deleteExperienceAsync = createAsyncThunk<
//   ProfileState,
//   { id: string },
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async ({ id }) => {
//   const res = await axios.delete<ProfileType>(`api/profile/experience/${id}`);
//   const state = useAppSelector((state) => state.profile);
//   return {
//     ...state,
//     profile: transformProfile(res.data),
//   };
// });

// // Delete ACcount Action
// export const deleteAccountAsync = createAsyncThunk<
//   void,
//   {},
//   { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
// >("profile/getProfile", async () => {
//   const res = await axios.delete<{ msg: string }>(`api/profile`);
//   profileSlice.actions.clearProfile();
//   authSlice.actions.logout();
//   const dispatch = useAppDispatch();
//   dispatch(alertAsync({ msg: res.data.msg }));
//   dispatch(alertAsync({ msg: "Your account has been deleted" }));
// });

// export const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     clearProfile: (state) => {
//       state.profile = null;
//       state.loading = false;
//       state.repos = [];
//       state.error = undefined;
//     },
//   },
//   extraReducers: (builder) => {
//     // Get Current Profile:
//     builder.addCase(getCurrentProfileAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getCurrentProfileAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getCurrentProfileAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Get Profile by ID:
//     builder.addCase(getProfileByIdAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getProfileByIdAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getProfileByIdAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Get Profiles:
//     builder.addCase(getProfilesAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getProfilesAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getProfilesAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Get Repos:
//     builder.addCase(getReposAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getReposAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(getReposAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Create/Update Profile:
//     builder.addCase(createUpdateProfileAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(createUpdateProfileAsync.fulfilled, (state, response) => {
//       state.loading = false;
//       const dispatch = useAppDispatch();
//       dispatch(
//         alertAsync({
//           msg: response.meta.arg.edit ? "Profile Updated" : "Profile Created",
//           alertType: "success",
//         })
//       );
//       response.meta.arg.navigate("/dashboard");
//     });
//     builder.addCase(createUpdateProfileAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Add Experience:
//     builder.addCase(addExperienceAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(addExperienceAsync.fulfilled, (state, response) => {
//       state.loading = false;
//       const dispatch = useAppDispatch();
//       dispatch(
//         alertAsync({
//           msg: "Experience Added",
//           alertType: "success",
//         })
//       );
//       response.meta.arg.navigate("/dashboard");
//     });
//     builder.addCase(addExperienceAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Add Education:
//     builder.addCase(addEducationAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(addEducationAsync.fulfilled, (state, response) => {
//       state.loading = false;
//       const dispatch = useAppDispatch();
//       dispatch(
//         alertAsync({
//           msg: "Education Added",
//           alertType: "success",
//         })
//       );
//       response.meta.arg.navigate("/dashboard");
//     });
//     builder.addCase(addEducationAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Delete Education:
//     builder.addCase(deleteEducationAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(deleteEducationAsync.fulfilled, (state) => {
//       state.loading = false;
//       const dispatch = useAppDispatch();
//       dispatch(
//         alertAsync({
//           msg: "Education Removed",
//           alertType: "success",
//         })
//       );
//     });
//     builder.addCase(deleteEducationAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Delete Experience:
//     builder.addCase(deleteExperienceAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(deleteExperienceAsync.fulfilled, (state) => {
//       state.loading = false;
//       const dispatch = useAppDispatch();
//       dispatch(
//         alertAsync({
//           msg: "Experience Removed",
//           alertType: "success",
//         })
//       );
//     });
//     builder.addCase(deleteExperienceAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });

//     // Delete Account:
//     builder.addCase(deleteAccountAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(deleteAccountAsync.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(deleteAccountAsync.rejected, (state, action) => {
//       const dispatch = useAppDispatch();
//       if (action.payload) {
//         handleError(state, action.payload, dispatch);
//       }
//     });
//   },
// });

export const x = "h";
