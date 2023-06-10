import axios, { AxiosError, AxiosResponse } from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTHENTICATION_EROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utiles/setAuthToken";
import { Success, LoadUser } from "../reducers/auth";
import { UserType } from "../../../models/User";

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

// Load user
export const loadUser =
  () =>
  async (dispatch: any): Promise<void> => {
    if (localStorage.token) setAuthToken(localStorage.token);
    try {
      const res: AxiosResponse<UserType> = await axios.get("/api/auth");
      const loadUser: LoadUser = { type: USER_LOADED, payload: res.data };
      dispatch(loadUser);
    } catch (error) {
      console.error(error);
      dispatch({ type: AUTHENTICATION_EROR });
    }
  };

// Register a user
export const register =
  ({ name, email, password }: RegisterProps) =>
  async (dispatch: any): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res: AxiosResponse<{
        token: string;
      }> = await axios.post("/api/users", body, config);
      const registerSuccess: Success = {
        type: REGISTER_SUCCESS,
        payload: res.data,
      };
      dispatch(registerSuccess);
      dispatch(loadUser());
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login a user
export const login =
  (email: string, password: string) =>
  async (dispatch: any): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res: AxiosResponse<{ token: string }> = await axios.post(
        "/api/auth",
        body,
        config
      );
      const loginSuccess: Success = {
        type: LOGIN_SUCCESS,
        payload: res.data,
      };
      dispatch(loginSuccess);
      dispatch(loadUser());
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const errors: { msg: string }[] = err.response?.data.errors;
      if (errors)
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Logout profile
export const logout =
  () =>
  (dispatch: any): void => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };
