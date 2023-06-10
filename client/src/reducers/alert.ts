import { SET_ALERT, REMOVE_ALERT, AlertTypes } from "../actions/types";

export interface Alert {
  msg: string;
  alertType: string;
  id: string;
}

export type AlertAction = SetAlert | RemoveAlert;

type SetAlert = { type: Extract<AlertTypes, "SET_ALERT">; payload: Alert };

type RemoveAlert = {
  type: Extract<AlertTypes, "REMOVE_ALERT">;
  payload: string;
};

const initialState: Alert[] = [];

export default function (
  state: Alert[] = initialState,
  action: AlertAction
): Alert[] {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
