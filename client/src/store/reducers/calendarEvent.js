import * as types from "./../actionTypes";

const initState = {
  createEvent: false,
  events: [],
  start: new Date(),
  end: new Date(),
};

const calendarEvent = (state = initState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return {
        ...state,
        createEvent: true,
      };
    case types.CREATE_EVENT_ERROR:
      return {
        ...state,
        createEvent: false,
      };
    case types.EVENT_CREATED:
      return {
        ...state,
        createEvent: false,
      };
    case types.EVENT_ADDED:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};

export default calendarEvent;
