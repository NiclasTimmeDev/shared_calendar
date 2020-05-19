import axios from "axios";
import setAuthToken from "./../../utils/setAuthToken";
import * as types from "./../actionTypes";
import setAlert from "./alert";

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      if (res.status === 200) {
        dispatch({
          type: types.USER_LOADED,
          payload: res.data,
        });
      } else {
        dispatch({
          type: types.AUTH_ERROR,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.AUTH_ERROR,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log(res);
      if (res.status !== 200) {
        return dispatch({
          type: types.AUTH_ERROR,
        });
      }
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: types.USER_LOADED,
      });
      dispatch(loadUser());
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.AUTH_ERROR,
      });
    }
  };
};
