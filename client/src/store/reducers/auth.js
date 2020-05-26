import * as types from "./../actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  authError: "",
  credentialsError: "",
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        authError: "",
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authError: "",
      };
    case types.CREDENTIALS_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        credentialsError: action.payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        authError: "Invalid credentials. Please try again.",
      };
    case types.REGISTER_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        authError: "Sorry, this email address is already taken.",
      };
    case types.LOGOUT:
    case types.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        authError: "",
      };
    default:
      return state;
  }
};

export default auth;
