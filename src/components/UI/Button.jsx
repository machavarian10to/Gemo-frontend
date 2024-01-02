import PropTypes from 'prop-types';

function Button({
  label = 'button',
  state = 'active',
  size = 'small',
  type = 'primary', // primary, danger, base
  submit = false,
  fillContainer = false,
  clickHandler,
  leftIcon,
  rightIcon,
}) {
  return (
    <button
      onClick={clickHandler}
      className={`button button-${size} button-${type} 
      ${state === 'inactive' ? `button-${state}` : ''}
      ${fillContainer ? 'button-full-width' : ''}`}
      disabled={state === 'inactive'}
      type={submit ? 'submit' : 'button'}
    >
      {leftIcon && <span className='button__icon'>{leftIcon}</span>}
      {label}
      {rightIcon && <span className='button__icon'>{rightIcon}</span>}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  state: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  submit: PropTypes.bool,
  fillContainer: PropTypes.bool,
  clickHandler: PropTypes.func,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
};

export default Button;
