import { useRef } from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateGemContainer from './CreateGemContainer';
import PublicIcon from '@mui/icons-material/Public';
import useClickOutside from '@/hook/useClickOutside';
import UserAvatar from '@/components/shared/UserAvatar';
import { Fade } from '@mui/material';

function CreatePostModal({ closeModal }) {
  const modalContentRef = useRef();

  useClickOutside(modalContentRef, () => closeModal());

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>Create a Gem</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: '#f9a109', fontSize: '25px' }}
              />
            </button>
          </div>
          <div className='modal-body'>
            <UserAvatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s' />
            <div className='modal-body__gem-details'>
              <h5>@machavarian10to</h5>
              <div className='audience-wrapper'>
                <span>Flavor:</span>
                <div className='audience'>
                  <PublicIcon style={{ fontSize: '13px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <CreateGemContainer closeModal={closeModal} />
          </div>
        </div>
      </div>
    </Fade>
  );
}

CreatePostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreatePostModal;
