import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function AlertBox({
  type = 'info', // success, error, warning, info
  message,
  duration = 3000,
}) {
  return (
    <div className={`notification-component`}>
      <div className={`notification-component_type ${type}`}></div>
      <p className='notification-component_message'>{message}</p>
      <div className='notification-component_close'>
        <HighlightOffIcon
          style={{ color: 'var(--color-grey)', fontSize: '25px' }}
        />
      </div>
    </div>
  );
}

AlertBox.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default AlertBox;
