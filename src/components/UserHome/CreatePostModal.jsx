import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import CreatePostContainer from './CreatePostContainer';
import PublicIcon from '@mui/icons-material/Public';

function CreatePostModal({ closeModal }) {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4>Create Post</h4>
          <button onClick={closeModal}>
            <CloseIcon fontSize='small' style={{ color: '#828282' }} />
          </button>
        </div>
        <div className='modal-body'>
          <div className='avatar'>
            <img
              src='https://scontent.ftbs6-2.fna.fbcdn.net/v/t1.6435-1/94128061_3139216286122545_1193598147729817600_n.jpg?stp=c0.41.480.479a_dst-jpg_p480x480&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEZPL3Jxp24RwODCr_FYundOWusImno31U5a6wiaejfVbGRBInb5gkzrS0wD-YNlMoVlZjAbUDaF8qUGSQnZBPN&_nc_ohc=S_pHUS0uHgMAX-6nziO&_nc_ht=scontent.ftbs6-2.fna&oh=00_AfBV6lZMwJHdY0Wwx3aOjo6qi09cs_le3JpR7DQF1GBn5Q&oe=65290009'
              alt='user avatar'
            />
          </div>

          <div>
            <h5>@machavarian10to</h5>
            <div className='audience-wrapper'>
              <span>audience:</span>
              <div className='audience'>
                <PublicIcon style={{ fontSize: '15px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <CreatePostContainer />
        </div>
      </div>
    </div>
  );
}

CreatePostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreatePostModal;
