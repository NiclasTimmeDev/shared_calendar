import React, { Fragment, useEffect } from "react";
import "./styles/bootstrap-grid.min.css";
import "./styles/App.css";

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
import PrivateRoute from "./components/Routing/PrivateRoute";
import CreateEvent from "./components/calendarEvent/CreateEvent";
import Navbar from "./components/Includes/Navbar";
import LandingPage from "./components/Landing/LandingPage";
import Footer from "./components/Includes/Footer";
import InvitationModal from "./components/calendar/InvitationModal";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import AcceptInvitation from "./components/calendar/AcceptInvitation";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <CreateEvent />
      <InvitationModal />
      <LoadingSpinner />
      <Router>
        <Navbar />
        <Fragment>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <PrivateRoute
              path="/calendar"
              component={CalendarDashboard}
              exact
            />
            <Route
              path="/invitation/accept/:token"
              component={AcceptInvitation}
            />
          </Switch>
        </Fragment>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
