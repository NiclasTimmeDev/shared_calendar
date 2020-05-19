import * as types from "./../actionTypes";
import { v4 as uuidv4 } from "uuid";

const setAlert = (msg, alertType) => {
  try {
    return async (dispatch) => {
      const id = uuidv4();
      dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, id },
      });
      setTimeout(() => {
        dispatch({
          type: types.REMOVE_ALERT,
          payload: id,
        });
      }, 5000);
    };
  } catch (error) {
    console.log(error.message);
  }
};

export default setAlert;
