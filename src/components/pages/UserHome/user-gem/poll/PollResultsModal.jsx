import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fade } from '@mui/material';
import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';

function PollResultsModal({ pollOptions, closeModal }) {
  const modalContentRef = useRef();

  const [activeOption, setActiveOption] = useState(pollOptions[0].id);

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
            <div className='poll-results__options-wrapper'>
              {pollOptions.map((option) => (
                <div
                  key={option.id}
                  className={`poll-results__option ${
                    activeOption === option.id ? 'active-option' : ''
                  }`}
                  onClick={() => setActiveOption(option.id)}
                >
                  <div className='poll-results__option-wrapper'>
                    <div className='poll-results__option-value'>
                      {option.value}
                    </div>
                    <span>
                      {`${option.users.length} ${
                        option.users.length > 1 ? 'votes' : 'vote'
                      }`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='poll-results__votes'>
              {pollOptions
                .find((option) => option.id === activeOption)
                .users.map((user) => (
                  <div key={user.id} className='poll-results__user-wrapper'>
                    <UserAvatar width={30} height={30} src={user.userPhoto} />
                    <div className='poll-results__user'>@{user.username}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

PollResultsModal.propTypes = {
  pollOptions: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PollResultsModal;
