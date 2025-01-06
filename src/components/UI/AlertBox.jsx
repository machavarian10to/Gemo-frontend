import PropTypes from 'prop-types';
import { Slide } from '@mui/material';
import { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function AlertBox({
  type = 'success', // info, success, error, warning
  message,
  duration = 3000,
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return (
    <Slide in={show} direction='left' timeout={500} mountOnEnter unmountOnExit>
      <div
        className={`notification-component ${type}`}
        onClick={() => setShow(false)}
      >
        <div className='meal-prepare-animation-wrapper'>
          {type === 'success' && (
            <CheckCircleOutlineOutlinedIcon style={{ fontSize: '22px' }} />
          )}
          {type === 'error' && (
            <ErrorOutlineOutlinedIcon style={{ fontSize: '22px' }} />
          )}
          {type === 'warning' && (
            <WarningAmberOutlinedIcon style={{ fontSize: '22px' }} />
          )}
          {type === 'info' && <InfoOutlinedIcon style={{ fontSize: '22px' }} />}
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
