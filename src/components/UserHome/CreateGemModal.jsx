import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import CreateGemContainer from './CreateGemContainer';
import PublicIcon from '@mui/icons-material/Public';

function CreatePostModal({ closeModal }) {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4>Create a Gem</h4>
          <button onClick={closeModal}>
            <CloseIcon fontSize='small' style={{ color: '#828282' }} />
          </button>
        </div>
        <div className='modal-body'>
          <div className='avatar'></div>
          <div>
            <h5>@machavarian10to</h5>
            <div className='audience-wrapper'>
              <span>community:</span>
              <div className='audience'>
                <PublicIcon style={{ fontSize: '15px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <CreateGemContainer closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

CreatePostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreatePostModal;
