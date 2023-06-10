import axios, { AxiosResponse, AxiosError } from "axios";
import { setAlert } from "./alert";
import {
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
import { ProfileType } from "../../../models/Profile";
import { NavigateFunction } from "react-router-dom";

type ProfileCreationForm = {
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

// Get current user's profile
export const getCurrentProfile =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<ProfileType> = await axios.get(
        "/api/profile/me"
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

//get all profiles
export const getProfiles =
  () =>
  async (dispatch: any): Promise<void> => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res: AxiosResponse<ProfileType[]> = await axios.get("/api/profile");
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

//get profile byid
export const getProfileById =
  (userId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<ProfileType> = await axios.get(
        `/api/profile/user/${userId}`
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

//get github repos
export const getGithubRepos =
  (username: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<Object[]> = await axios.get(
        `/api/profile/github/${username}`
      );
      dispatch({
        type: GET_REPOS,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

export const createProfile =
  (
    profileData: ProfileCreationForm,
    navigate: NavigateFunction,
    edit: boolean = false
  ) =>
  async (dispatch: any): Promise<void> => {
    try {
      const body = JSON.stringify(profileData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res: AxiosResponse<ProfileType> = await axios.post(
        "api/profile",
        body,
        config
      );
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// Add experince

export const addExperience =
  (formData: ExperienceCreationForm, navigate: NavigateFunction) =>
  async (dispatch: any): Promise<void> => {
    try {
      const body = JSON.stringify(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res: AxiosResponse<ProfileType> = await axios.put(
        "api/profile/experience",
        body,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experince Added", "success"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// Add education

export const addEducation =
  (formData: EducationCreationForm, navigate: NavigateFunction) =>
  async (dispatch: any): Promise<void> => {
    try {
      const body = JSON.stringify(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res: AxiosResponse<ProfileType> = await axios.put(
        "api/profile/education",
        body,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// Delete experience
export const deleteExperience =
  (id: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<ProfileType> = await axios.delete(
        `api/profile/experience/${id}`
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// Delete education
export const deleteEducation =
  (id: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      const res: AxiosResponse<ProfileType> = await axios.delete(
        `api/profile/education/${id}`
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// Delete account and profile
export const deleteAccount =
  () =>
  async (dispatch: any): Promise<void> => {
    if (window.confirm("Are you sure? this can't be undone!")) {
      try {
        const res: AxiosResponse<{ msg: string }> = await axios.delete(
          `api/profile`
        );
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: ACCOUNT_DELETED,
        });
        dispatch(setAlert(res.data.msg));
        dispatch(setAlert("Your account has been deleted"));
      } catch (error) {
        console.error(error);
        const err = error as AxiosError;
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response?.statusText,
            status: err.response?.status,
          },
        });
      }
    }
  };
