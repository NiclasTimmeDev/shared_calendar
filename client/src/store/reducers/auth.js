import * as types from "./../actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case types.AUTH_ERROR:
    case types.LOGOUT:
    case types.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default auth;
