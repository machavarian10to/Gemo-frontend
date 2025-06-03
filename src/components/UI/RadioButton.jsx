import PropTypes from 'prop-types';

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <div className='radio-component-buttons'>
      <label className='radio-component'>
        <input
          type='radio'
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className='radio-component-checkmark'></span>
        {label}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
