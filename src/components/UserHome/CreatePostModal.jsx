import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import CreatePostContainer from './CreatePostContainer';
import PublicIcon from '@mui/icons-material/Public';

function CreatePostModal({ closeModal }) {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4>Create Discussion</h4>
          <button onClick={closeModal}>
            <CloseIcon fontSize='small' style={{ color: '#828282' }} />
          </button>
        </div>
        <div className='modal-body'>
          <div className='avatar'>
            {/* <img
              src='https://scontent.ftbs5-2.fna.fbcdn.net/v/t31.18172-8/22555593_2043481365881944_1848984884889756625_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=nDgolxega2YAX_pUVSD&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfBrX8H3BGuZGr5InXnOnZY_XmgaaiHZe_ewKWZAeJ8I1g&oe=652CE053'
              alt='user avatar'
            /> */}
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
