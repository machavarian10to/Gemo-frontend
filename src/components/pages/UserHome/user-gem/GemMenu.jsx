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
import axiosInstance from '@/services/axios';
import { deleteGem } from '@/state/index';
import { useTranslation } from 'react-i18next';

function GemMenu({ gem }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(gem.type);
  const postEditRef = useRef(null);

  const [modalStates, setModalStates] = useState({
    showGemEdit: false,
    showGemAuthEdit: false,
    showModal: false,
  });

  const [alertBox, setAlertBox] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    if (modalStates.showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalStates.showModal]);

  useClickOutside(postEditRef, () => {
    setModalStates({
      ...modalStates,
      showGemAuthEdit: false,
      showGemEdit: false,
    });
  });

  function showGemEditWrapper() {
    if (gem.author._id === user._id) {
      setModalStates({
        ...modalStates,
        showGemAuthEdit: !modalStates.showGemAuthEdit,
      });
    } else {
      setModalStates({
        ...modalStates,
        showGemEdit: !modalStates.showGemEdit,
      });
    }
  }

  function isPollEnded() {
    if (gem.content.pollDuration === `${t('gem.poll_durations.none')}`)
      return false;
    const gemCreatedAt = new Date(gem.createdAt);
    const pollDurationInDays = gem.content.pollDuration[0];
    const pollEndTime = new Date(
      gemCreatedAt.getTime() + pollDurationInDays * 24 * 60 * 60 * 1000,
    );
    return pollEndTime < new Date();
  }

  function onGemEdit() {
    if (gem.type === 'poll' && isPollEnded()) {
      setAlertBox({
        type: 'error',
        message: `${t('gem.cant_edit_finished_poll')}`,
      });
      setTimeout(() => {
        setAlertBox({ type: '', message: '' });
      }, 2000);
      return;
    }
    setModalStates({ ...modalStates, showModal: true });
  }

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function gemDeleteHandler() {
    axiosInstance
      .delete(`/api/gems/${gem._id}`)
      .then(() => {
        setAlertBox({
          type: 'success',
          message: `${t('gem.deleted_success')}`,
        });
        setModalStates({ ...modalStates, showGemAuthEdit: false });
        setTimeout(() => dispatch(deleteGem(gem._id)), 1000);
      })
      .catch((err) => {
        setAlertBox({
          type: 'error',
          message: err.response.data.message || `${t('something_wrong')}`,
        });
      });
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox
          duration={1000}
          type={alertBox.type}
          message={alertBox.message}
        />
      )}

      {modalStates.showModal && (
        <NewGemModal
          gem={gem}
          title={t('gem.edit_gem')}
          closeModal={() =>
            setModalStates({ ...modalStates, showModal: false })
          }
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}

      <div
        className={`user-gem__menu ${
          modalStates.showGemAuthEdit || modalStates.showGemEdit
            ? 'user-gem__menu-active'
            : ''
        }`}
      >
        <MoreVertOutlinedIcon
          style={{ color: 'var(--color-grey)', fontSize: '22px' }}
          onClick={() => showGemEditWrapper()}
        />

        {modalStates.showGemAuthEdit && (
          <Fade in={modalStates.showGemAuthEdit} timeout={500}>
            <div className='user-gem__edit-wrapper' ref={postEditRef}>
              <div className='user-gem__edit-item' onClick={onGemEdit}>
                <EditOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('gem.edit_gem')}</span>
              </div>
              <div className='user-gem__edit-item' onClick={gemDeleteHandler}>
                <DeleteOutlineOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('gem.delete_gem')}</span>
              </div>
              <div className='user-gem__edit-item'>
                <NotificationsOffOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('gem.turn_off_notifications')}</span>
              </div>
              <div className='user-gem__edit-item'>
                <IntegrationInstructionsOutlinedIcon
                  style={{
                    fontSize: '22px',
                    color: 'var(--color-main-yellow)',
                  }}
                />
                <span>{t('gem.embed_gem')}</span>
              </div>
            </div>
          </Fade>
        )}

        {modalStates.showGemEdit && (
          <div className='user-gem__edit-wrapper' ref={postEditRef}>
            <div className='user-gem__edit-item'>
              <NoMealsOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>{t('gem.not_food_related')}</span>
            </div>

            <div className='user-gem__edit-item'>
              <SentimentDissatisfiedOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>{t('gem.not_interesting')}</span>
            </div>

            <div className='user-gem__edit-item'>
              <VisibilityOffOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>{t('gem.hide_gem')}</span>
            </div>

            <div className='user-gem__edit-item'>
              <BlockOutlinedIcon
                style={{
                  fontSize: '20px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>{`${t('block')} @${gem.author.username}`}</span>
            </div>

            <div className='user-gem__edit-item'>
              <ReportGmailerrorredOutlinedIcon
                style={{
                  fontSize: '22px',
                  color: 'var(--color-main-yellow)',
                }}
              />
              <span>{t('gem.report_gem')}</span>
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
