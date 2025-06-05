import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Zoom } from '@mui/material';

function Input({
  name,
  value = '',
  label,
  type = 'text', // text, password, email, number, date
  state = 'active', // danger, inactive
  size = 'medium', // extra-small, small, medium, large
  mandatory,
  onInput,
  onKeyDown,
  onBlur,
  placeholder,
  helperText,
  focused,
  leftIcon,
  fullWidth,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    <div
      className='input-component-container'
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {label && (
        <label className='input-component-label' htmlFor={name}>
          {label}
          {mandatory && <span className='mandatory'> *</span>}
        </label>
      )}
      <div
        className={`input-component-wrapper ${
          state === 'danger' ? 'danger' : ''
        }`}
      >
        {leftIcon && (
          <div className='input-component-left-icon'>{leftIcon}</div>
        )}
        <input
          ref={inputRef}
          name={name}
          type={type}
          value={value}
          onInput={onInput}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete='off'
          disabled={state === 'inactive'}
          className={`input-component ${size} ${state} ${
            leftIcon ? size + '-left-icon' : ''
          }`}
        />
        {helperText && (
          <Zoom in={true} timeout={400}>
            <p
              className={`${
                state === 'danger' ? 'error-text' : 'support-text'
              }`}
            >
              {helperText}
            </p>
          </Zoom>
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  state: PropTypes.string,
  size: PropTypes.string,
  mandatory: PropTypes.bool,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  focused: PropTypes.bool,
  leftIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
};

export default Input;
