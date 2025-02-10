import { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='tooltip-wrapper'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div className={`tooltip tooltip-${position} ${isVisible ? 'show' : ''}`}>
        {text}
        <div className='tooltip-arrow'></div>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  position: PropTypes.string,
};

export default Tooltip;
