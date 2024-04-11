import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef } from 'react';

function PollResultsModal({ pollOptions, totalVotes, closeModal }) {
  const modalContentRef = useRef();

  useClickOutside(modalContentRef, () => closeModal());

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>Poll results</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>

          <div className='poll-results__modal-content-wrapper'>
            {pollOptions.map((option) => (
              <div key={option.id} className='poll-results__option'>
                <div className='poll-results__option-wrapper'>
                  <div className='poll-results__option-value'>
                    {option.value}
                  </div>
                  <div>
                    {totalVotes > 0
                      ? ((option.users.length / totalVotes) * 100).toFixed(0)
                      : 0}
                    %
                  </div>
                </div>
                {/* {option.users.map((user) => (
                <div key={user.id}>
                  <div className='poll-results__user'>{user.username}</div>
                  <img src={user.userPhoto} alt={user.username} />
                </div>
              ))} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}

PollResultsModal.propTypes = {
  pollOptions: PropTypes.array.isRequired,
  totalVotes: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PollResultsModal;
