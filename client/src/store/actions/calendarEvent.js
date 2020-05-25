import * as types from "./../actionTypes";
import axios from "axios";
import setAlert from "./alert";

//other redux actions:
import { loadEvents } from "./calendar";
import { eventWasUpdated } from "./calendar";

/*==========================
HELPER METHODS
==========================*/
import { generateErrorMsgs } from "./../../utils/helperMethods";

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
      eventWasUpdated(error);
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

/*============================
START UPDATING ONE EVENT
============================*/
export const updateEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_EVENT,
    });
  };
};

/*============================
FINISH UPDATING ONE EVENT
============================*/
export const endUpdateEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.EVENT_UPDATED,
    });
  };
};

/*=============================
SET THE CURRENT EVENT
=============================*/
export const setCurrentEvent = (event) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_CURRENT_EVENT,
      payload: event,
    });
  };
};

/*===========================
INTERRUPT UPDATING AN EVENT
===========================*/
export const interruptUpdatingAnEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_EVENT_ERROR,
    });
  };
};

/*============================
SEND UPDATED EVENT TO DB
============================*/
export const submitUpdatedEvent = (event) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch("/api/calendar/events/update", event);
      if (res.status === 200) {
        dispatch(eventWasUpdated(res.data));
        dispatch({
          type: types.EVENT_UPDATED,
          payload: res.data,
        });
      } else {
        dispatch({
          type: types.UPDATE_EVENT_ERROR,
        });
      }
    } catch (error) {
      eventWasUpdated(error);
      dispatch({
        type: types.UPDATE_EVENT_ERROR,
      });
    }
  };
};
