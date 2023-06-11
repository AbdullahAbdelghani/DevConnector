import { Profile, transformProfile } from "../utiles/models";
import { ProfileType } from "../../../models/Profile";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, isAxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { addAlert } from "./alert";
import { authSlice } from "./auth";

export type ProfileState = {
  profile: Profile | null;
  profiles: Profile[];
  repos: Object[];
  loading: boolean;
  error?: {
    msg: string;
    status: number;
  };
};

export type ProfileCreationForm = {
  company: string;
  website: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: string;
  facebook: string;
  youtube: string;
  twitter: string;
  instagram: string;
  linkedin: string;
};

type ExperienceCreationForm = {
  company: string;
  title: string;
  location: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
};

type EducationCreationForm = {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
};

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: undefined,
};

// Get Current Profile Action
export const getCurrentProfileAsync = createAsyncThunk<
  Profile,
  undefined,
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/get/me", async () => {
  const res = await axios.get<ProfileType>("/api/profile/me");
  return transformProfile(res.data);
});

// Get Profile By Id Action
export const getProfileByIdAsync = createAsyncThunk<
  Profile,
  { userId: string },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/get:id", async ({ userId }) => {
  const res = await axios.get<ProfileType>(`/api/profile/user/${userId}`);
  return transformProfile(res.data);
});

// Get All Profiles Action
export const getProfilesAsync = createAsyncThunk<
  Profile[],
  undefined,
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/get/all", async () => {
  const res = await axios.get<ProfileType[]>("/api/profile");
  return res.data.map((profile) => transformProfile(profile));
});

// Get Github Repos Action
export const getReposAsync = createAsyncThunk<
  Object[],
  { username: string },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/getGithubRepos", async ({ username }) => {
  const res = await axios.get<Object[]>(`/api/profile/github/${username}`);
  return res.data;
});

// Create or Update Profile Action
export const createUpdateProfileAsync = createAsyncThunk<
  Profile,
  {
    profileData: ProfileCreationForm;
    navigate: NavigateFunction;
    edit?: boolean;
  },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>(
  "profile/create-update",
  async ({ profileData, navigate, edit = false }, { dispatch }) => {
    try {
      const body = JSON.stringify(profileData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post<ProfileType>("api/profile", body, config);
      addAlert(dispatch, {
        msg: edit ? "Profile Updated" : "Profile Created",
        alertType: "success",
      });
      return transformProfile(res.data);
    } catch (err) {
      if (isAxiosError(err)) {
        const errors: { msg: string }[] = err.response?.data.errors;
        if (errors)
          errors.forEach((error) => {
            addAlert(dispatch, { msg: error.msg, alertType: "danger" });
          });
      }
      throw err;
    }
  }
);

// Add Experience Action
export const addExperienceAsync = createAsyncThunk<
  Profile,
  { formData: ExperienceCreationForm; navigate: NavigateFunction },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/add/experience", async ({ formData, navigate }, { dispatch }) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put<ProfileType>(
      "api/profile/experience",
      body,
      config
    );
    addAlert(dispatch, {
      msg: "Experince Added",
      alertType: "success",
    });
    return transformProfile(res.data);
  } catch (err) {
    if (isAxiosError(err)) {
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          addAlert(dispatch, { msg: error.msg, alertType: "danger" });
        });
    }
    throw err;
  }
});

// Add Education Action
export const addEducationAsync = createAsyncThunk<
  Profile,
  { formData: EducationCreationForm; navigate: NavigateFunction },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/add/education", async ({ formData, navigate }, { dispatch }) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put<ProfileType>(
      "api/profile/education",
      body,
      config
    );
    addAlert(dispatch, { msg: "Education Added", alertType: "success" });
    return transformProfile(res.data);
  } catch (err) {
    if (isAxiosError(err)) {
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          addAlert(dispatch, { msg: error.msg, alertType: "danger" });
        });
    }
    throw err;
  }
});

// Delete Education Action
export const deleteEducationAsync = createAsyncThunk<
  Profile,
  { id: string },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/delete/education", async ({ id }, { dispatch }) => {
  const res = await axios.delete<ProfileType>(`api/profile/education/${id}`);
  addAlert(dispatch, { msg: "Education Removed", alertType: "success" });
  return transformProfile(res.data);
});

// Delete Experience Action
export const deleteExperienceAsync = createAsyncThunk<
  Profile,
  { id: string },
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/delete/experience", async ({ id }, { dispatch }) => {
  const res = await axios.delete<ProfileType>(`api/profile/experience/${id}`);
  addAlert(dispatch, { msg: "Experience Removed", alertType: "success" });
  return transformProfile(res.data);
});

// Delete ACcount Action
export const deleteAccountAsync = createAsyncThunk<
  void,
  undefined,
  { rejectValue: AxiosError<{ errors: { msg: string }[] }> }
>("profile/delete/account", async (_, { dispatch }) => {
  const res = await axios.delete<{ msg: string }>(`api/profile`);
  dispatch(profileSlice.actions.clearProfile());
  dispatch(authSlice.actions.logout());
  addAlert(dispatch, { msg: res.data.msg });
  addAlert(dispatch, { msg: "Your account has been deleted" });
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.repos = [];
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // Get Current Profile:
    builder.addCase(getCurrentProfileAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getCurrentProfileAsync.rejected, (state, action) => {
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
        state.profile = null;
        state.loading = false;
      }
    });

    // Get Profile by ID:
    builder.addCase(getProfileByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileByIdAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfileByIdAsync.rejected, (state, action) => {
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
        state.profile = null;
        state.loading = false;
      }
    });

    // Get Profiles:
    builder.addCase(getProfilesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfilesAsync.fulfilled, (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfilesAsync.rejected, (state, action) => {
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
        state.profiles = [];
        state.loading = false;
      }
    });

    // Get Repos:
    builder.addCase(getReposAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReposAsync.fulfilled, (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    });
    builder.addCase(getReposAsync.rejected, (state, action) => {
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
        state.repos = [];
        state.loading = false;
      }
    });

    // Create/Update Profile:
    builder.addCase(createUpdateProfileAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUpdateProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      action.meta.arg.navigate("/dashboard");
    });
    builder.addCase(createUpdateProfileAsync.rejected, (state, action) => {
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
        state.profile = null;
        state.loading = false;
      }
    });

    // Add Experience:
    builder.addCase(addExperienceAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addExperienceAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      action.meta.arg.navigate("/dashboard");
    });
    builder.addCase(addExperienceAsync.rejected, (state, action) => {
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
        state.loading = false;
      }
    });

    // Add Education:
    builder.addCase(addEducationAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEducationAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      action.meta.arg.navigate("/dashboard");
    });
    builder.addCase(addEducationAsync.rejected, (state, action) => {
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
        state.loading = false;
      }
    });

    // Delete Education:
    builder.addCase(deleteEducationAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEducationAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteEducationAsync.rejected, (state, action) => {
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
        state.loading = false;
      }
    });

    // Delete Experience:
    builder.addCase(deleteExperienceAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExperienceAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteExperienceAsync.rejected, (state, action) => {
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
        state.loading = false;
      }
    });

    // Delete Account:
    builder.addCase(deleteAccountAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccountAsync.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAccountAsync.rejected, (state, action) => {
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
        state.loading = false;
      }
    });
  },
});
