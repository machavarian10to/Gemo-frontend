import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Input({
  name,
  value = '',
  type = 'text', // text, password, email, number, date
  state = 'active', // danger, inactive
  size = 'medium', // extra-small, small, medium, large
  onInput,
  placeholder,
  helperText,
  focused,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    <div className='input-component-wrapper'>
      <input
        ref={inputRef}
        name={name}
        type={type}
        value={value}
        onInput={onInput}
        placeholder={placeholder}
        disabled={state === 'inactive'}
        className={`input-component ${size} ${state}`}
      />
      {helperText && (
        <p className={`${state === 'danger' ? 'error-text' : 'support-text'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  state: PropTypes.string,
  size: PropTypes.string,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  focused: PropTypes.bool,
};

export default Input;
