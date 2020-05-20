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
        type: types.LOGIN_ERROR,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
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
      const errors = error.response.data.errors;
      console.log(errors);

      if (errors) {
        errors.forEach((errors) => {
          setAlert(error.msg, "danger");
        });
      }
      dispatch({
        type: types.LOGIN_ERROR,
      });
    }
  };
};

export const register = (username, email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/register", {
        name: username,
        email: email,
        password: password,
      });

      if (res.status === 401) {
        return dispatch({
          type: types.REGISTER_ERROR,
        });
      }

      if (res.status === 201) {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: types.AUTH_SUCCESS,
        });
        dispatch(loadUser());
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);

      if (errors) {
        errors.forEach((errors) => {
          setAlert(error.msg, "danger");
        });
      }
      dispatch({
        type: types.REGISTER_ERROR,
      });
    }
  };
};
