//packages
import axios from "axios";

//other files:
import * as types from "./../actionTypes";
import setAlert from "./alert";

/*========================
LOAD THE CALENDAR THE USER IS MEMBER IN
1. Query the API (it will will find the calendar by the token that is provided in the header of the request (see ../utils/setAuthToken))
2. Only if response is 200, put the response (calendar) in the redux state
3. Fire the function loadEvents (see below in this file), which will load all events of this calendar
========================*/
export const loadCalendar = () => {
  return async (dispatch) => {
    try {
      //1:
      const res = await axios.get("/api/calendar/find");
      if (res.status === 400) {
        setAlert("You are not a member of a calendar yet.");
        console.log("Here is the problem");
        return dispatch({
          type: types.CALENDAR_LOADED_ERROR,
        });
      }

      //2:
      if (res.status === 200) {
        dispatch({
          type: types.CALENDAR_LOADED,
          payload: res.data,
        });

        //3:
        dispatch(loadEvents(res.data._id));
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

/*================================
SET DATE IN REDUX
================================*/
export const setDate = (date) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_DATE, payload: date });
  };
};

/*================================
STORE ALL DAYS OF A MONTH
================================*/
export const loadMonthDates = (monthDates) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOAD_MONTH_DATES,
      payload: monthDates,
    });
  };
};

/*================================
LOAD ALL EVENTS OF A CALENDAR
1. Qeury the API (it will will find the calendar events by the token that is provided in the header of the request (see ../utils/setAuthToken))
2. If the response code is 200, the response will be an array of objects that contain info on the specific event
3. Store the array in redux
================================*/
export const loadEvents = () => {
  return async (dispatch) => {
    try {
      //1:
      const res = await axios.get("/api/calendar/events/findall");

      //2:
      if (res.status === 200) {
        //3:
        dispatch({
          type: types.EVENTS_LOADED,
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
    }
  };
};

/*==============================
UPDATE AN EVENT IN THE EVENTS ARRAY
this function gets called in the actions file of the calendarEvents after an event was updated
==============================*/
export const eventWasUpdated = (event) => {
  return async (dispatch) => {
    dispatch({
      type: types.EVENT_WAS_UPDATED,
      payload: event,
    });
  };
};
