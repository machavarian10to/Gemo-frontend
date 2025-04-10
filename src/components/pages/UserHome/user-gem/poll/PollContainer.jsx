import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    setPercentage(
      totalVotes > 0
        ? ((option.users.length / totalVotes) * 100).toFixed(0)
        : 0,
    );
  }, [option.users.length, totalVotes]);

  return (
    <label
      className={`user-gem__poll-option-wrapper ${
        pollIsEnded ? 'ended-poll' : ''
      }`}
    >
      <div className='user-gem__poll-option-container'>
        <div
          style={{
            width: `${percentage}%`,
            borderRadius:
              percentage === '100'
                ? 'var(--border-radius-rect)'
                : '9px 0 0 9px',
          }}
          className='user-gem__poll-option-container-inner'
        ></div>
        <div className='user-gem__poll-input'>
          {multipleSelection ? (
            <label className='user-gem__checkbox-label' htmlFor={groupName}>
              <input
                disabled={pollIsEnded}
                type='checkbox'
                id={groupName}
                checked={option.users.find((u) => u.id === user._id) || false}
                onChange={onChange}
                value={option.value}
              />
              <span>{option.value}</span>
              <span className='user-gem__checkbox-checkmark'></span>
            </label>
          ) : (
            <label className='user-gem__radio-label'>
              <input
                disabled={pollIsEnded}
                type='radio'
                name={groupName}
                checked={option.users.find((u) => u.id === user._id) || false}
                onChange={onChange}
                value={option.value}
              />
              <span className='user-gem__radio-checked'></span>
              {option.value}
            </label>
          )}
        </div>

        <div className='user-gem__poll-numbers'>
          <div className='user-gem__poll-option-percentage'>{percentage}%</div>
          <div className='user-gem__poll-option-count'>
            {option.users.length > 1
              ? `${option.users.length} ${t('gem.votes')}`
              : `${option.users.length} ${t('gem.vote')}`}
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
