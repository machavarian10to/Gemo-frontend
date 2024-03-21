import { useRef } from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateGemContainer from './CreateGemContainer';
import PublicIcon from '@mui/icons-material/Public';
import useClickOutside from '@/hook/useClickOutside';
import UserAvatar from '@/components/shared/UserAvatar';
import { Fade } from '@mui/material';
import { useSelector } from 'react-redux';

function CreatePostModal({ closeModal, activeTab, handleActiveTab }) {
  const modalContentRef = useRef();
  const user = useSelector((state) => state.user);

  useClickOutside(modalContentRef, () => closeModal());

  return (
    <Fade in={true} timeout={600}>
      <div className='modal'>
        <div className='modal-content' ref={modalContentRef}>
          <div className='modal-header'>
            <h4>Create a Gem</h4>
            <button onClick={closeModal}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>
          <div className='modal-body'>
            <UserAvatar width={45} height={40} />
            <div className='modal-body__gem-details'>
              <h5>@{user.username}</h5>
              <div className='audience-wrapper'>
                <span>audience:</span>
                <div className='audience'>
                  <PublicIcon style={{ fontSize: '13px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <CreateGemContainer
              closeModal={closeModal}
              activeTab={activeTab}
              handleActiveTab={handleActiveTab}
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}

CreatePostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleActiveTab: PropTypes.func.isRequired,
};

export default CreatePostModal;
