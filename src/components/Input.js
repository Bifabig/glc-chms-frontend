import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Input.module.css';

const Input = forwardRef((props, ref) => {
  const {
    name, placeholder, type, step,
  } = props;
  return (
    <input
      className={styles.input}
      name={name}
      type={type}
      ref={ref}
      placeholder={placeholder}
      step={step}
      required
    />
  );
});

Input.defaultProps = {
  step: '', // Add a default value for `step` prop
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
