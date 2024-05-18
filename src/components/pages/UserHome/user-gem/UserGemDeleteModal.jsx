import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/components/UI/Button';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';
import AlertBox from '@/components/UI/AlertBox';

function UserGemDeleteModal({ closeDeleteGemModal, gemId }) {
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alertBox, setAlertBox] = useState({ type: '', message: '' });

  function gemDeleteHandler() {
    setIsButtonDisabled(true);
    axiosInstance
      .delete(`/api/gems/${gemId}`)
      .then(() => {
        setAlertBox({
          type: 'success',
          message: 'Gem deleted successfully!',
        });

        setTimeout(() => {
          dispatch(deleteGem(gemId));
          closeDeleteGemModal();
          setAlertBox({ type: '', message: '' });
        }, 2000);
      })
      .catch((err) => {
        setAlertBox({
          type: 'error',
          message: err.response.data.message || 'Something went wrong!',
        });
        setIsButtonDisabled(false);

        setTimeout(() => {
          closeDeleteGemModal();
          setAlertBox({ type: '', message: '' });
        }, 2000);
      });
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      <Fade in={true} timeout={500}>
        <div className='modal' onClick={() => closeDeleteGemModal()}>
          <div
            className='modal-container-wrapper'
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Are you sure you want to delete this gem?</h3>

            <div className='modal-buttons-wrapper'>
              <Button
                size='large'
                type='base'
                label='Cancel'
                clickHandler={() => closeDeleteGemModal()}
              />
              <Button
                state={isButtonDisabled ? 'inactive' : 'active'}
                size='large'
                type='danger'
                label='Delete'
                clickHandler={gemDeleteHandler}
              />
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

UserGemDeleteModal.propTypes = {
  closeDeleteGemModal: PropTypes.func.isRequired,
  gemId: PropTypes.string.isRequired,
};

export default UserGemDeleteModal;
