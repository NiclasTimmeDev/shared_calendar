import React, { Fragment, useEffect } from "react";
import "./styles/App.css";
import "./styles/bootstrap-grid.min.css";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./store/store";
import { Provider } from "react-redux";
import { loadUser } from "./store/actions/auth";

//components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CalendarDashboard from "./components/calendar/CalendarDashboard";

//utils
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/calendar" component={CalendarDashboard} exact />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
