import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PollContainer({
  option,
  onChange,
  totalVotes,
  groupName,
  pollIsEnded,
  multipleSelection,
}) {
  const [percentage, setPercentage] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPercentage(
      totalVotes > 0
        ? ((option.users.length / totalVotes) * 100).toFixed(0)
        : 0,
    );
  }, [option.users.length, totalVotes]);

  return (
    <label
      className={`user-post__poll-option-wrapper ${
        pollIsEnded ? 'ended-poll' : ''
      }`}
    >
      <div className='user-post__poll-option-container'>
        <div
          style={{
            width: `${percentage}%`,
            borderRadius:
              percentage === '100'
                ? 'var(--border-radius-rect)'
                : '5px 0 0 5px',
          }}
          className='user-post__poll-option-container-inner'
        ></div>
        <div className='user-post__poll-input'>
          {multipleSelection ? (
            <label className='user-post__checkbox-label' htmlFor={groupName}>
              <input
                disabled={pollIsEnded}
                type='checkbox'
                id={groupName}
                checked={option.users.includes(user.username)}
                onChange={onChange}
                value={option.value}
              />
              <span>{option.value}</span>
            </label>
          ) : (
            <label className='user-post__radio-label'>
              <input
                disabled={pollIsEnded}
                type='radio'
                name={groupName}
                checked={option.users.includes(user.username)}
                onChange={onChange}
                value={option.value}
              />
              <span className='user-post__radio-checked'></span>
              {option.value}
            </label>
          )}
        </div>

        <div className='user-post__poll-numbers'>
          <div className='user-post__poll-option-percentage'>{percentage}%</div>
          <div className='user-post__poll-option-count'>
            {option.users.length > 1
              ? `${option.users.length} votes`
              : `${option.users.length} vote`}
          </div>
        </div>
      </div>
    </label>
  );
}

PollContainer.propTypes = {
  option: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  totalVotes: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  pollIsEnded: PropTypes.bool.isRequired,
  multipleSelection: PropTypes.bool,
};

export default PollContainer;
