import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type Alert = {
  msg?: string;
  alertType?: string;
};
const initialState: { data: (Alert & { id: string })[] } = { data: [] };

export const addAlert = (disaptch: Dispatch, alert: Alert) => {
  const id = v4();
  disaptch(alertSlice.actions.addAlert({ ...alert, id }));
  setTimeout(() => disaptch(alertSlice.actions.removeAlert({ id })), 3000);
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const payload: Alert & { id: string } = action.payload;
      state.data.push(payload);
    },
    removeAlert: (state, action) => {
      state.data = state.data.filter((alert) => alert.id !== action.payload.id);
    },
  },
});
