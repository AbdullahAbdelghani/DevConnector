import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type Alert = {
  msg?: string;
  alertType?: string;
};
const initialState: { alerts: (Alert & { id: string })[] } = { alerts: [] };

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
      state.alerts.push(payload);
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload.id
      );
    },
  },
});
