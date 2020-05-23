import * as types from "./../actionTypes";
import axios from "axios";
import setAlert from "./alert";

import { loadEvents } from "./calendar";

export const createNewEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_EVENT,
    });
  };
};

export const submitNewEvent = (
  title,
  date,
  start,
  end,
  isWholeDay,
  from,
  to,
  notes
) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/calendar/create/event", {
        title,
        date,
        start,
        end,
        from,
        to,
        isWholeDay,
        notes,
      });

      if (res.status === 201) {
        dispatch({
          type: types.EVENT_CREATED,
        });
        dispatch(loadEvents());
      } else {
        dispatch({
          type: types.CREATE_EVENT_ERROR,
        });
        setAlert("Sorry, somethin went wrong.", "danger");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const interruptEventCreation = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_EVENT_ERROR,
    });
  };
};

export const eventCreated = () => {
  return async (dispatch) => {
    dispatch({
      type: types.EVENT_CREATED,
    });
  };
};
