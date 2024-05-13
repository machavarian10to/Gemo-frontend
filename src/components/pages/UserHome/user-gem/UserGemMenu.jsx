import { useState, useRef, useEffect } from 'react';
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
import NoMealsOutlinedIcon from '@mui/icons-material/NoMealsOutlined';
import CreateGemModal from '@/components/pages/UserHome/create-new-gem/CreateGemModal';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AlertBox from '@/components/UI/AlertBox';
import { useSelector } from 'react-redux';

function UserGemMenu({ gem }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showGemAuthEdit, setShowGemAuthEdit] = useState(false);
  const [showGemEdit, setShowGemEdit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(gem.type);

  const postEditRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

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

  function isPollEnded() {
    if (gem.body.pollDuration === '- None -') return false;
    const gemCreatedAt = new Date(gem.createdAt);
    const pollDurationInDays = gem.body.pollDuration[0];
    const pollEndTime = new Date(
      gemCreatedAt.getTime() + pollDurationInDays * 24 * 60 * 60 * 1000,
    );
    return pollEndTime < new Date();
  }

  function onGemEdit() {
    if (gem.type === 'poll' && isPollEnded()) {
      setAlertBox({
        type: 'error',
        message: 'You cannot edit a poll which is ended',
      });
      setTimeout(() => {
        setAlertBox({ type: '', message: '' });
      }, 2000);
      return;
    }
    setShowModal(true);
    if (gem.userId === user._id) {
      setShowGemAuthEdit(false);
    } else {
      setShowGemEdit(false);
    }
  }

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      {showModal && (
        <CreateGemModal
          gem={gem}
          title='Edit gem'
          closeModal={() => setShowModal(false)}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
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
              <div className='user-gem__edit-item' onClick={onGemEdit}>
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
              <NoMealsOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Not food related</span>
            </div>

            <div className='user-gem__edit-item'>
              <SentimentDissatisfiedOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>Not interesting for me</span>
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
