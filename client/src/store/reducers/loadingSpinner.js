import * as types from "./../actionTypes";

const initState = {
  showSpinner: false,
};

const loadingSpinner = (state = initState, action) => {
  switch (action.type) {
    case types.SHOW_SPINNER:
      return {
        ...state,
        showSpinner: true,
      };
    case types.HIDE_SPINNER:
      return {
        ...state,
        showSpinner: false,
      };
    default:
      return state;
  }
};

export default loadingSpinner;
