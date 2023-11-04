import PropTypes from 'prop-types';

function CommandButton({ type, title, icon, isActive, handleCommandClick }) {
  return (
    <button
      onClick={() => handleCommandClick(type)}
      style={{ background: isActive && '#E4E6EB' }}
      title={title}
    >
      <div className='command-btn'>{icon}</div>
    </button>
  );
}

CommandButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  handleCommandClick: PropTypes.func.isRequired,
};

export default CommandButton;
