import { useState, useRef } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';
import { useDispatch } from 'react-redux';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AlertBox from '@/components/UI/AlertBox';

function UserGemMenu({ gem }) {
  const [showPostEdit, setShowPostEdit] = useState(false);
  const postEditRef = useRef(null);
  const dispatch = useDispatch();

  const [alertBox, setAlertBox] = useState({
    type: '',
    message: '',
  });

  useClickOutside(postEditRef, () => {
    setShowPostEdit(false);
  });

  function onGemDelete() {
    axiosInstance
      .delete(`/api/gems/${gem._id}`)
      .then((res) => {
        setAlertBox({ type: 'success', message: 'Gem deleted successfully!' });
        dispatch(deleteGem(res.data._id));
        setTimeout(() => {
          setAlertBox({ type: '', message: '' });
        }, 2000);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      <div
        className={`user-gem__menu ${
          showPostEdit ? 'user-gem__menu-active' : ''
        }`}
      >
        <MoreVertOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '20px' }}
          onClick={() => setShowPostEdit((prev) => !prev)}
        />

        {showPostEdit && (
          <Fade in={showPostEdit} timeout={400}>
            <div className='user-gem__edit-wrapper' ref={postEditRef}>
              <div className='user-gem__edit-item'>
                <EditOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Edit</span>
              </div>
              <div className='user-gem__edit-item' onClick={onGemDelete}>
                <DeleteOutlineOutlinedIcon
                  style={{
                    fontSize: '18px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Delete</span>
              </div>
            </div>
          </Fade>
        )}
      </div>
    </>
  );
}

UserGemMenu.propTypes = {
  gem: PropTypes.object.isRequired,
};
export default UserGemMenu;
