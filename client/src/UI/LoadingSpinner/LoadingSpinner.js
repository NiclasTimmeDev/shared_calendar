import React from "react";
import PropTypes from "prop-types";
import css from "./LoadingSpinner.module.css";

//redux
import { connect } from "react-redux";

const LoadingSpinner = (props) => {
  return (
    props.showSpinner && (
      <div className={css.background}>
        <div className={css.spinkitWrapper}>
          <div className={css.skChase}>
            <div className={css.chaseDot}></div>
            <div className={css.chaseDot}></div>
            <div className={css.chaseDot}></div>
            <div className={css.chaseDot}></div>
            <div className={css.chaseDot}></div>
            <div className={css.chaseDot}></div>
          </div>
        </div>
      </div>
    )
  );
};

LoadingSpinner.propTypes = {};

const mapStateToProps = (state) => ({
  showSpinner: state.loadingSpinner.showSpinner,
});

export default connect(mapStateToProps)(LoadingSpinner);
