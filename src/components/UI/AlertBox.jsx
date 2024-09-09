import PropTypes from 'prop-types';
import { Slide } from '@mui/material';
import { useState, useEffect } from 'react';
import AnimationMealPrepare from '@/components/animations/AnimationMealPrepare';

function AlertBox({
  type = 'success', // info, success, error, warning
  message,
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Slide in={show} direction='left' timeout={500} mountOnEnter unmountOnExit>
      <div
        className={`notification-component ${type}`}
        onClick={() => setShow(false)}
      >
        <div className='meal-prepare-animation-wrapper'>
          <AnimationMealPrepare />
        </div>
        <p className='notification-component_message'>{message}</p>
      </div>
    </Slide>
  );
}

AlertBox.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default AlertBox;
