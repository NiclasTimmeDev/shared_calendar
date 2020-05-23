import React from "react";
import css from "./Backdrop.module.css";

const Backdrop = (props) => {
  return <div className={css.Backdrop} onClick={props.click}></div>;
};

export default Backdrop;
