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
          <button onClick={closeModal}>
            <HighlightOffIcon
              style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
            />
          </button>
          <div className='modal-body'>
            <div className='modal-body__gem-details'></div>
          </div>
          <div className='modal-footer'></div>
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
