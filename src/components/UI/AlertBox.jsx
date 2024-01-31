import PropTypes from 'prop-types';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Fade } from '@mui/material';
import { useState, useEffect } from 'react';

function AlertBox({
  type = 'warning', // info, success, error, warning
  message,
  duration = 2100,
}) {
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => Math.min(prevWidth + 5, 100));
    }, 100);

    setTimeout(() => {
      setShow(false);
      clearInterval(interval);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  if (!show) return null;

  return (
    <Fade in={show} timeout={500}>
      <div className='notification-component' onClick={() => setShow(false)}>
        <div className='notification-component_icon'>
          {type === 'success' && (
            <CheckCircleOutlineOutlinedIcon
              style={{ color: 'var(--color-main-green)', fontSize: '30px' }}
            />
          )}
          {type === 'error' && (
            <DangerousOutlinedIcon
              style={{ color: 'var(--bg-main-red)', fontSize: '30px' }}
            />
          )}
          {type === 'warning' && (
            <WarningAmberOutlinedIcon
              style={{
                color: 'var(--color-yellow-shade-07)',
                fontSize: '30px',
              }}
            />
          )}
          {type === 'info' && (
            <InfoOutlinedIcon
              style={{ color: 'var(--color-main-blue)', fontSize: '30px' }}
            />
          )}
        </div>
        <div
          className={`notification-component_type ${type}`}
          style={{ width: width + '%' }}
        ></div>
        <p className={`notification-component_message ${type}`}>{message}</p>
      </div>
    </Fade>
  );
}

AlertBox.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default AlertBox;
