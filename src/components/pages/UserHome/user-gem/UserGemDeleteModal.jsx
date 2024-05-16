import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/components/UI/Button';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';
import AlertBox from '@/components/UI/AlertBox';

function UserGemDeleteModal({ setShowGemDeleteModal, gemId }) {
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [alertBox, setAlertBox] = useState({
    type: '',
    message: '',
  });

  function gemDeleteHandler() {
    setIsButtonDisabled(true);
    axiosInstance
      .delete(`/api/gems/${gemId}`)
      .then((res) => {
        dispatch(deleteGem(res.data._id));
        setAlertBox({ type: 'success', message: 'Gem deleted successfully!' });
        console.log(alertBox);
        setTimeout(() => {
          setAlertBox({ type: '', message: '' });
          console.log(alertBox);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setIsButtonDisabled(false);
      });
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      <Fade in={true} timeout={500}>
        <div className='modal' onClick={() => setShowGemDeleteModal(false)}>
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
                clickHandler={() => setShowGemDeleteModal(false)}
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
  setShowGemDeleteModal: PropTypes.func.isRequired,
  gemId: PropTypes.string.isRequired,
};

export default UserGemDeleteModal;
