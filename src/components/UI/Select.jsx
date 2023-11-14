import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Select({ label, defaultValue, options }) {
  return (
    <div className='select'>
      <p className='select-component-label'>{label}</p>
      <div className='select-component'>
        <div className='select-title'>
          <span>{defaultValue}</span>
          <ArrowDropDownIcon style={{ color: '#BDBDBD', fontSize: '20px' }} />
        </div>
      </div>
      <div className='options-container'>
        <ul className='options'>
          {options.map((option) => (
            <li key={option.id} className='option'>
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
