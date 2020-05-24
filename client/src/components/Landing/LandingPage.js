import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import createEventImg from "./../../assets/create_event.png";
import gridWithEventsImg from "./../../assets/grid_with_events.png";
import gridWithoutEventsImg from "./../../assets/grid_without_events.png";

const LandingPage = (props) => {
  return (
    <Fragment>
      <div className="hero-section">
        <h1 className="hero-header">
          Stop asking about the plan. Share a calendar.
        </h1>
        <div className="hero-subheader">
          Optimize your organization by sharing a calendar, where you can see
          and create events of and for each other.{" "}
        </div>
        <Link to="/register">
          <button className="btn btn-primary">Register today</button>
        </Link>
      </div>
      <div className="container">
        <section class="product-advertisement">
          <div className="container">
            <div className="row align-items-center product-advertisement-row">
              <div className="col-sm-6">
                <div className="product-advertisement-content">
                  <h2 className="header-small">
                    Always know whats on your co-members schedule
                  </h2>
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  class="img img-full-width-height product-advertisement-img"
                  src={gridWithEventsImg}
                  alt=""
                />
              </div>
            </div>
            <div className="row align-items-center product-advertisement-row">
              <div className="col-sm-6">
                <img
                  class="img img-full-width-height product-advertisement-img"
                  src={createEventImg}
                  alt=""
                />
              </div>
              <div className="col-sm-6">
                <div className="product-advertisement-content">
                  <h2 className="header-small">Create events for yourself</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center product-advertisement-row">
              <div className="col-sm-6">
                <div className="product-advertisement-content">
                  <h2 className="header-small">
                    Create events for your co-member
                  </h2>
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  class="img img-full-width-height product-advertisement-img"
                  src={gridWithoutEventsImg}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default LandingPage;
