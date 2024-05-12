import { useState, useRef } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';
import { useDispatch } from 'react-redux';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AlertBox from '@/components/UI/AlertBox';
import { useSelector } from 'react-redux';

function UserGemMenu({ gem }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showGemAuthEdit, setShowGemAuthEdit] = useState(false);
  const [showGemEdit, setShowGemEdit] = useState(false);

  const postEditRef = useRef(null);

  const [alertBox, setAlertBox] = useState({
    type: '',
    message: '',
  });

  useClickOutside(postEditRef, () => {
    setShowGemAuthEdit(false);
    setShowGemEdit(false);
  });

  function showGemEditWrapper() {
    if (gem.userId === user._id) {
      setShowGemAuthEdit(!showGemAuthEdit);
    } else {
      setShowGemEdit(!showGemEdit);
    }
  }

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
          showGemAuthEdit || showGemEdit ? 'user-gem__menu-active' : ''
        }`}
      >
        <MoreVertOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '22px' }}
          onClick={() => showGemEditWrapper()}
        />

        {showGemAuthEdit && (
          <Fade in={showGemAuthEdit} timeout={400}>
            <div className='user-gem__edit-wrapper' ref={postEditRef}>
              <div className='user-gem__edit-item'>
                <EditOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Edit gem</span>
              </div>
              <div className='user-gem__edit-item' onClick={onGemDelete}>
                <DeleteOutlineOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Delete gem</span>
              </div>
              <div className='user-gem__edit-item'>
                <NotificationsOffOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Turn off notifications</span>
              </div>
              <div className='user-gem__edit-item'>
                <IntegrationInstructionsOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>Embed gem</span>
              </div>
            </div>
          </Fade>
        )}

        {showGemEdit && (
          <div className='user-gem__edit-wrapper' ref={postEditRef}>
            <div className='user-gem__edit-item'>
              <SentimentDissatisfiedOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Not interested with gem content</span>
            </div>

            <div className='user-gem__edit-item'>
              <VisibilityOffOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Hide gem</span>
            </div>

            <div className='user-gem__edit-item'>
              <BlockOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Block @{gem.userName}</span>
            </div>

            <div className='user-gem__edit-item'>
              <ReportGmailerrorredOutlinedIcon
                style={{
                  fontSize: '22px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Report gem</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

UserGemMenu.propTypes = {
  gem: PropTypes.object.isRequired,
};
export default UserGemMenu;
