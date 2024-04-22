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
