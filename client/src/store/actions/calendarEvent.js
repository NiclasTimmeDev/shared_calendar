import * as types from "./../actionTypes";
import axios from "axios";
import setAlert from "./alert";

import { loadEvents } from "./calendar";

/*===========================
SET CREATE EVENT TO true
this is necessary in order to show the component for creating an event, as this will only show if createEvent == true
===========================*/
export const createNewEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_EVENT,
    });
  };
};

/*==========================================
CREATE A NEW EVENT
1. Send req to API with all the relevant params
2. Only if res.status is 201, set createEvent in Redux to false
3. Reload all calendar events
==========================================*/
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
      //1:
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

      //2:
      if (res.status === 201) {
        dispatch({
          type: types.EVENT_CREATED,
        });

        //3:
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
