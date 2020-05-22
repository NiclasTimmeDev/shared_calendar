import * as types from "./../actionTypes";

const initState = {
  calendarID: "",
  members: [],
  events: [],
  loading: true,
  date: new Date(),
  monthDates: [],
};

const calendar = (state = initState, action) => {
  switch (action.type) {
    case types.CALENDAR_LOADED:
      return {
        ...state,
        calendarID: action.payload._id,
        members: action.payload.members,
        loading: false,
      };
    case types.CALENDAR_LOADED_ERROR:
      return {
        ...state,
        members: [],
        events: [],
        loading: true,
      };
    case types.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case types.LOAD_MONTH_DATES:
      return {
        ...state,
        monthDates: action.payload,
      };
    case types.EVENTS_LOADED:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export default calendar;
