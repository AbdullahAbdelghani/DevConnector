import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 } from "uuid";

export const setAlert =
  (msg: string, alertType: string = "dark") =>
  (dispatch: any): void => {
    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      3000
    );
  };
