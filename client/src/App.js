import React, { Fragment } from "react";
import "./styles/App.css";
import "./styles/bootstrap-grid.min.css";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./store/store";
import { Provider } from "react-redux";

//components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
