//packages
import axios from "axios";

//other files:
import * as types from "./../actionTypes";
import setAlert from "./alert";
import { bindActionCreators } from "redux";

export const loadCalendar = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/calendar/find");
      if (res.status === 400) {
        setAlert("You are not a member of a calendar yet.");
        return dispatch({
          type: types.CALENDAR_LOADED_ERROR,
        });
      }
      if (res.status === 200) {
        dispatch({
          type: types.CALENDAR_LOADED,
          payload: res.data,
        });
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        console.log(errors);
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }
      dispatch({
        type: types.CALENDAR_LOADED_ERROR,
      });
    }
  };
};

export const setDate = (date) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_DATE, payload: date });
  };
};
