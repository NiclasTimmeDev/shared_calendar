import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//reducers
import auth from "./reducers/auth";
import alert from "./reducers/alert";
import calendar from "./reducers/calendar";
import calendarEvent from "./reducers/calendarEvent";
import loadingSpinner from "./reducers/loadingSpinner";

const initState = {};

const rootReducer = combineReducers({
  auth,
  alert,
  calendar,
  calendarEvent,
  loadingSpinner,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
