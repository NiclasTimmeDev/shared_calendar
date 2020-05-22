import * as types from "./../actionTypes";

export const createNewEvent = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_EVENT,
    });
  };
};

export const eventCreated = () => {
  return async (dispatch) => {
    dispatch({
      type: types.EVENT_CREATED,
    });
  };
};
