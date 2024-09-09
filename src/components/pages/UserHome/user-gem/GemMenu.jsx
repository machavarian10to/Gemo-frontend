import { useState, useRef, useEffect } from 'react';
import useClickOutside from '@/hook/useClickOutside';
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
import NewGemModal from '@/components/pages/UserHome/create-new-gem/NewGemModal';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import AlertBox from '@/components/UI/AlertBox';
import { useSelector, useDispatch } from 'react-redux';
import GemDeleteModal from '@/components/pages/UserHome/user-gem/GemDeleteModal';
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';

function GemMenu({ gem }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [showGemAuthEdit, setShowGemAuthEdit] = useState(false);
  const [showGemEdit, setShowGemEdit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(gem.type);

  const [showGemDeleteModal, setShowGemDeleteModal] = useState(false);

  const postEditRef = useRef(null);

  useEffect(() => {
    if (showModal || showGemDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal, showGemDeleteModal]);

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

  function gemDeleteHandler() {
    setShowGemAuthEdit(false);
    axiosInstance
      .delete(`/api/gems/${gem._id}`)
      .then(() => {
        setAlertBox({
          type: 'success',
          message: 'Gem deleted successfully!',
        });

        setTimeout(() => {
          dispatch(deleteGem(gem._id));
          setAlertBox({ type: '', message: '' });
        }, 1000);
      })
      .catch((err) => {
        setAlertBox({
          type: 'error',
          message: err.response.data.message || 'Something went wrong!',
        });
        setTimeout(() => {
          setAlertBox({ type: '', message: '' });
        }, 1000);
      });
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

      {showModal && (
        <NewGemModal
          gem={gem}
          title='Edit gem'
          closeModal={() => setShowModal(false)}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}

      {showGemDeleteModal && (
        <GemDeleteModal
          closeDeleteGemModal={() => setShowGemDeleteModal(false)}
          gemId={gem._id}
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
          <Fade in={showGemAuthEdit} timeout={500}>
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
              <div className='user-gem__edit-item' onClick={gemDeleteHandler}>
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

GemMenu.propTypes = {
  gem: PropTypes.object.isRequired,
};
export default GemMenu;
