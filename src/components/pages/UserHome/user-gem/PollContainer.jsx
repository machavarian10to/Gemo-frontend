import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PollContainer({ option, onChange, totalVotes }) {
  const [percentage, setPercentage] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setPercentage(
      totalVotes > 0 ? (option.users.length / totalVotes) * 100 : 0,
    );
  }, [option.users.length, totalVotes]);

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
              checked={option.users.includes(user.username)}
              onChange={onChange}
              value={option.value}
            />
            <span className='user-post__radio-checked'></span>
            {option.value}
          </label>
        </div>

        <div className='user-post__poll-numbers'>
          <div className='user-post__poll-option-percentage'>{percentage}%</div>
          <div className='user-post__poll-option-count'>
            {option.users.length} votes
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
