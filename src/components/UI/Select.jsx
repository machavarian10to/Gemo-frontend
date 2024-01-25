import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useClickOutside from '@/hook/useClickOutside';
import Fade from '@mui/material/Fade';
import { useRef } from 'react';

function Select({
  label,
  selectedOption,
  options,
  showOptions,
  setShowOptions,
  selectOption,
}) {
  const selectRef = useRef(null);
  useClickOutside(selectRef, () => showOptions && setShowOptions(false));
  return (
    <div className='select-component' ref={selectRef}>
      <p className='select-component-label'>{label}</p>
      <div
        className={`selected-option ${showOptions ? 'active' : ''}`}
        onClick={setShowOptions}
      >
        <div className='selected-option-title'>
          <span>{selectedOption}</span>
          <ArrowDropDownIcon
            style={{
              color: 'var(--color-main-grey)',
              fontSize: '20px',
              transform: showOptions && 'rotate(0.5turn)',
              transition: 'transform 0.4s ease',
            }}
          />
        </div>
      </div>
      {showOptions && (
        <Fade in={true} timeout={600}>
          <div className='options-container'>
            <ul className='options-list'>
              {options.map((option) => (
                <li
                  key={option.id}
                  className={option.selected ? 'selected' : ''}
                  onClick={selectOption}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      )}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  selectedOption: PropTypes.string,
  options: PropTypes.array,
  showOptions: PropTypes.bool,
  setShowOptions: PropTypes.func,
  selectOption: PropTypes.func,
};

export default Select;
