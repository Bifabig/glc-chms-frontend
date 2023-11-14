import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Input.module.css';

const Input = forwardRef((props, ref) => {
  const [focused, setFocused] = useState(false);
  const {
    name, placeholder, type, step, errorMsg,
  } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div>
      <input
        className={styles.input}
        name={name}
        type={type}
        ref={ref}
        placeholder={placeholder}
        step={step}
        onBlur={handleFocus}
        // eslint-disable-next-line react/no-unknown-property
        focused={focused.toString()}
      />
      <span className={styles.errorMsg}>{errorMsg}</span>
    </div>
  );
});

Input.defaultProps = {
  step: '', // Add a default value for `step` prop
  errorMsg: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.string,
  errorMsg: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
