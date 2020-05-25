import * as types from "./../actionTypes";

const initState = {
  createEvent: false,
  updateEvent: false,
  events: [],
  start: new Date(),
  end: new Date(),
  currentEvent: {},
};

const calendarEvent = (state = initState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT:
      return {
        ...state,
        createEvent: true,
        updateEvent: false,
      };
    case types.CREATE_EVENT_ERROR:
      return {
        ...state,
        createEvent: false,
      };
    case types.UPDATE_EVENT:
      return {
        ...state,
        createEvent: false,
        updateEvent: true,
      };
    case types.EVENT_UPDATED:
      return {
        ...state,
        currentEvent: action.payload,
        updateEvent: false,
      };
    case types.UPDATE_EVENT_ERROR:
      return {
        ...state,
        updateEvent: false,
      };
    case types.EVENT_CREATED:
      return {
        ...state,
        createEvent: false,
      };
    case types.SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
      };
    case types.UNSET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: {},
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
