import PropTypes from 'prop-types';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Fade } from '@mui/material';
import { useState } from 'react';

function AlertBox({
  type = 'error', // success, error, warning, info
  message,
  duration = 3000,
}) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Fade in={show} timeout={500}>
      <div className='notification-component' onClick={() => setShow(false)}>
        <div className='notification-component_icon'>
          {type === 'success' && (
            <CheckCircleOutlineOutlinedIcon
              style={{ color: 'var(--bg-main-green)', fontSize: '30px' }}
            />
          )}
          {type === 'error' && (
            <DangerousOutlinedIcon
              style={{ color: 'var(--bg-main-red)', fontSize: '30px' }}
            />
          )}
          {type === 'warning' && (
            <WarningAmberOutlinedIcon
              style={{ color: 'var(--bg-main-yellow)', fontSize: '30px' }}
            />
          )}
          {type === 'info' && (
            <InfoOutlinedIcon
              style={{ color: 'var(--bg-main-blue)', fontSize: '30px' }}
            />
          )}
        </div>
        <div className={`notification-component_type ${type}`}></div>
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
