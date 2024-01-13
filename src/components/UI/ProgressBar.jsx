import PropTypes from 'prop-types';

function ProgressBar({ level, percent, color }) {
  return (
    <div className='progress-bar'>
      <div
        className={`progress-bar-inner ${level}`}
        style={{ width: `${percent}%`, background: `${color}` }}
      ></div>
    </div>
  );
}

ProgressBar.propTypes = {
  level: PropTypes.string,
  percent: PropTypes.string,
  color: PropTypes.string,
};

export default ProgressBar;
