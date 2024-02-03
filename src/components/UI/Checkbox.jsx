import PropTypes from 'prop-types';

function Checkbox({ label, checked, onChange }) {
  return (
    <label className='checkbox-component-label'>
      {label}
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span className='checkbox-component-checkmark'></span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
