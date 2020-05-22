import * as types from "./../actionTypes";

const initState = {
  createEvent: false,
};

const calendarEvent = (state = initState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return {
        ...state,
        createEvent: true,
      };
    case types.EVENT_CREATED:
      return {
        ...state,
        createEvent: false,
      };
    default:
      return state;
  }
};

export default calendarEvent;
