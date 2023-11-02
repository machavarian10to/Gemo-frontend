import PropTypes from 'prop-types';

function CommandButton({ isActive, type, icon }) {
  return (
    <button style={{ background: isActive && '#E4E6EB' }} title={type}>
      <div className='command-btn'>{icon}</div>
    </button>
  );
}

CommandButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default CommandButton;
