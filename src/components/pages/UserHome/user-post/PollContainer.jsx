import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PollContainer({ option, onChange, totalVotes }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(Math.round((option.count / totalVotes) * 100));
  }, [option.count, totalVotes]);

  return (
    <label className='user-post__poll-option-wrapper'>
      <div className='user-post__poll-option-container'>
        <div
          style={{ width: `calc(${percentage}% - 2px)` }}
          className='user-post__poll-option-container-inner'
        ></div>
        <div className='user-post__poll-input'>
          <label className='user-post__radio-label'>
            <input
              type='radio'
              name='radio'
              checked={option.checked}
              onChange={onChange}
              value={option.text}
            />
            <span className='user-post__radio-checked'></span>
            {option.text}
          </label>
        </div>

        <div className='user-post__poll-numbers'>
          <div className='user-post__poll-option-percentage'>{percentage}%</div>
          <div className='user-post__poll-option-count'>
            {option.count} votes
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
};

export default PollContainer;
