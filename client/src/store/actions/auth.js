import axios from "axios";
import setAuthToken from "./../../utils/setAuthToken";
import * as types from "./../actionTypes";
import setAlert from "./alert";

/*==========================
Load user from DB
1. if token in localStorage, set it as default header in axios
2. Send request to API
3. Only if response code is 200, dispatch the action that stores the user from the HTTP response in redux
4. If res.status is not 200, dispatch error action
==========================*/
export const loadUser = () => {
  return async (dispatch) => {
    //1:
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      //2:
      const res = await axios.get("/api/auth");

      //3:
      if (res.status === 200) {
        dispatch({
          type: types.USER_LOADED,
          payload: res.data,
        });
      }
      //4:
      else {
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

/*==================================
Log in user
1. Make request to API
2. If response is not 200, display error
3. If the HTTP response is "positive", the server will send a token. Store it in localStorage
4. Dispatch loadUser action, which will load the user from the db by the token
5. Dispatch Success action
==================================*/
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      //1:
      const res = await axios.post("/api/auth/login", { email, password });

      //2:
      if (res.status !== 200) {
        return dispatch({
          type: types.AUTH_ERROR,
        });
      }

      //3:
      localStorage.setItem("token", res.data.token);

      //4:
      dispatch(loadUser());
      //5:
      dispatch({
        type: types.AUTH_SUCCESS,
      });
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

/*================================
REGISTER USER
1. Send request to API
2. Send error if negative response from server
3. If success, the server will send token. Store it in localStorage
4. Dispatch loadUser action, which will load the user from the db by the token.
5. Dispatch Success action
================================*/
export const register = (username, email, password) => {
  return async (dispatch) => {
    try {
      //1:
      const res = await axios.post("/api/users/register", {
        name: username,
        email: email,
        password: password,
      });

      //2:
      if (res.status === 401) {
        return dispatch({
          type: types.REGISTER_ERROR,
        });
      }

      if (res.status === 201) {
        //3:

        localStorage.setItem("token", res.data.token);
        //4:
        dispatch(loadUser());

        //5:
        dispatch({
          type: types.AUTH_SUCCESS,
        });
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
