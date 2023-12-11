import PropTypes from 'prop-types';

function ProgressBar({ level, percent }) {
  return (
    <div className='progress-bar'>
      <div
        className={`progress-bar-inner ${level}`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

ProgressBar.propTypes = {
  level: PropTypes.string,
  percent: PropTypes.string,
};

export default ProgressBar;
