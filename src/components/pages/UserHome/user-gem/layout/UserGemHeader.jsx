import Fade from '@mui/material/Fade';
import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { deleteGem } from '@/state/index';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '@/services/axios';
import useClickOutside from '@/hook/useClickOutside';

function UserGemHeader({ gem }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPostEdit, setShowPostEdit] = useState(false);
  const postEditRef = useRef(null);

  useClickOutside(postEditRef, () => {
    setShowPostEdit(false);
  });

  function getTimeDifference(createdAt) {
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime - createdAt);
    const secondsDifference = Math.round(timeDifference / 1000);
    const minutesDifference = Math.round(secondsDifference / 60);
    const hoursDifference = Math.round(minutesDifference / 60);
    const daysDifference = Math.round(hoursDifference / 24);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? 's' : ''
      } ago`;
    } else {
      return `just now`;
    }
  }

  function getUserLevel() {
    const userLevelMap = {
      novice: '#62baac',
      home: '#56ccf2',
      enthusiast: '#f8ad9d',
      gourmet: '#a52a2a',
      explorer: '#92bdd9',
      professional: '#6c6377',
      master: '#f9a109',
    };
    return userLevelMap[user.level];
  }

  function onGemDelete() {
    axiosInstance
      .delete(`/api/gems/${gem._id}`)
      .then((res) => dispatch(deleteGem(res.data._id)))
      .catch((err) => console.error(err));
  }

  return (
    <div className='user-gem__header'>
      <div className='user-gem__user-info'>
        <UserAvatar width={32} height={32} src={gem.userPhoto} />
        <div className='user-gem__details'>
          <div className='user-gem__username'>
            @
            <a href={`/user/@${gem.userName}`} target='_blank' rel='noreferrer'>
              {gem.userName}
            </a>
          </div>
          <div className='user-gem__user-level'>
            <span>&#8226;</span>
            <span>{getTimeDifference(new Date(gem.createdAt))}</span>
          </div>
        </div>

        <div className='user-gem__date'>
          <LocalPoliceOutlinedIcon
            style={{
              color: getUserLevel(),
              fontSize: '9px',
            }}
          />
        </div>
      </div>

      <div className='user-gem__menu-options-wrapper'>
        <div className='user-gem__fullscreen'>
          <AspectRatioOutlinedIcon
            style={{ fontSize: '20px', color: 'var(--color-grey)' }}
          />
        </div>

        <div
          className='user-gem__menu'
          style={{
            background: showPostEdit && 'var(--bg-main-white)',
          }}
        >
          <MoreVertOutlinedIcon
            style={{ color: 'var(--color-grey)', fontSize: '20px' }}
            onClick={() => setShowPostEdit((prev) => !prev)}
          />

          {showPostEdit && (
            <Fade in={showPostEdit} timeout={400}>
              <div className='user-gem__comment-edit-wrapper' ref={postEditRef}>
                <div className='user-gem__comment-edit-item'>
                  <EditOutlinedIcon
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-main-yellow)',
                    }}
                  />
                  <span>Edit</span>
                </div>
                <div
                  className='user-gem__comment-edit-item'
                  onClick={onGemDelete}
                >
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
      </div>
    </div>
  );
}

UserGemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemHeader;
