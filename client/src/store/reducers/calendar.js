import * as types from "./../actionTypes";

const initState = {
  calendarID: "",
  members: [],
  events: [],
  outStandingInvitationToken: "",
  loading: true,
  date: new Date(),
  monthDates: [],
  showInvitationModal: false,
};

const calendar = (state = initState, action) => {
  switch (action.type) {
    case types.CALENDAR_LOADED:
      return {
        ...state,
        calendarID: action.payload._id,
        members: action.payload.members,
        outStandingInvitationToken: action.payload.openInvitation,
        loading: false,
      };
    case types.CALENDAR_LOADED_ERROR:
      return {
        ...state,
        members: [],
        events: [],
        loading: false,
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
    case types.EVENT_WAS_UPDATED:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event._id === action.payload._id) {
            return action.payload;
          } else {
            return event;
          }
        }),
      };
    case types.SHOW_INVITATION_MODAL:
      return {
        ...state,
        showInvitationModal: true,
      };
    case types.HIDE_INVITATION_MODAL:
      return {
        ...state,
        showInvitationModal: false,
      };
    default:
      return state;
  }
};

export default calendar;
