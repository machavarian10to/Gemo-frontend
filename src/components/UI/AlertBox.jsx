import PropTypes from 'prop-types';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Slide } from '@mui/material';
import { useState, useEffect } from 'react';

function AlertBox({
  type = 'warning', // info, success, error, warning
  message,
  duration = 2800,
}) {
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => Math.min(prevWidth + 4, 100));
    }, 100);

    setTimeout(() => {
      setShow(false);
      clearInterval(interval);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  if (!show) return null;

  return (
    <Slide in={show} direction='left' timeout={500} mountOnEnter unmountOnExit>
      <div
        className={`notification-component ${type}`}
        onClick={() => setShow(false)}
      >
        <div className='notification-component_icon'>
          {type === 'success' && (
            <CheckCircleOutlineOutlinedIcon style={{ fontSize: '30px' }} />
          )}
          {type === 'error' && (
            <DangerousOutlinedIcon style={{ fontSize: '30px' }} />
          )}
          {type === 'warning' && (
            <WarningAmberOutlinedIcon
              style={{
                fontSize: '30px',
              }}
            />
          )}
          {type === 'info' && <InfoOutlinedIcon style={{ fontSize: '30px' }} />}
        </div>
        <div
          className='notification-component_type'
          style={{ width: width + '%' }}
        ></div>
        <p className={`notification-component_message ${type}`}>{message}</p>
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
