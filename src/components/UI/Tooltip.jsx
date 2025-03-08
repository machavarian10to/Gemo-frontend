import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@mui/material';

const Tooltip = ({ text, children, position = 'bottom' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='tooltip-container'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <Fade in={true} timeout={500}>
          <div className={`tooltip-box tooltip-${position}`}>{text}</div>
        </Fade>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  position: PropTypes.string,
};

export default Tooltip;
