import React, { Fragment } from "react";
import PropTypes from "prop-types";

const FormGroup = (props) => {
  return (
    <Fragment>
      <input
        type={props.type}
        name={props.name}
        className={!props.error ? "no-gutter" : "no-gutter input-error"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.description && <span className="small">{props.description}</span>}

      {props.error && (
        <span className="form-error form-error-small">{props.errorText}</span>
      )}
    </Fragment>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
};

export default FormGroup;
