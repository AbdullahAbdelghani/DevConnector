import axios from "axios";
import { setAlert } from "./alert";
import {
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile =
  (profileData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify(profileData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("api/profile", body, config);
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      navigate("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      console.error(err);
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add experince

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/experience", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experince Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(err);
    if (errors)
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add education

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/education", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(err);
    if (errors)
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
