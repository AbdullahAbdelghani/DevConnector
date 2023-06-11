import axios, { AxiosError, isAxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, transformUser } from "../utiles/models";
import { setAuthToken } from "../utiles/setAuthToken";
import { UserType } from "../../../models/User";
import { addAlert } from "./alert";

export type AuthState = {
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
};

const initialState: AuthState = (() => {
  const token = localStorage.getItem("token") ?? undefined;
  setAuthToken(token);
  return {
    token,
    isAuthenticated: false,
    loading: false,
    user: undefined,
  };
})();

export const loadUserAsync = async (): Promise<User> => {
  const res = await axios.get<UserType>("/api/auth");
  return transformUser(res.data);
};

export const loginAsync = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  {
    rejectValue: AxiosError<{ errors: { msg: string }[] }>;
  }
>("auth/login", async (params, { dispatch }) => {
  try {
    const { email, password } = params;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    const {
      data: { token },
    } = await axios.post<{ token: string }>("/api/auth", body, config);
    localStorage.setItem("token", token);
    setAuthToken(token);
    const user = await loadUserAsync();

    return {
      user: user,
      token,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.data.errors) {
        const errors: { msg: string }[] = err.response?.data.errors;
        if (errors)
          errors.forEach((error) => {
            addAlert(dispatch, {
              msg: error.msg,
              alertType: "danger",
            });
          });
      }
      throw err;
    } else throw err;
  }
});

export const registerAsync = createAsyncThunk<
  { user: User; token: string },
  { name: string; email: string; password: string },
  {
    rejectValue: AxiosError<{ errors: { msg: string }[] }>;
  }
>("auth/register", async (params, { dispatch }) => {
  try {
    const { name, email, password } = params;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    const {
      data: { token },
    } = await axios.post<{ token: string }>("/api/auth", body, config);
    localStorage.setItem("token", token);
    setAuthToken(token);
    const user = await loadUserAsync();
    return {
      user: user,
      token,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.data.errors) {
        const errors: { msg: string }[] = err.response?.data.errors;
        if (errors)
          errors.forEach((error) => {
            addAlert(dispatch, {
              msg: error.msg,
              alertType: "danger",
            });
          });
      }
      throw err;
    } else throw err;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = undefined;
      state.isAuthenticated = false;
      state.loading = false;
      setAuthToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginAsync.rejected, (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
      state.token = undefined;
      state.isAuthenticated = false;
      state.loading = false;
    });

    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(registerAsync.rejected, (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
      state.token = undefined;
      state.isAuthenticated = false;
      state.loading = false;
    });
  },
});
