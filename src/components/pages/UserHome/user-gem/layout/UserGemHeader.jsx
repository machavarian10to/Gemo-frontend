import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import UserGemMenu from '@/components/pages/UserHome/user-gem/UserGemMenu';

function UserGemHeader({ gem }) {
  const user = useSelector((state) => state.user);

  function getTimeDifference(updatedAt) {
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime - updatedAt);
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

  return (
    <div className='user-gem__header'>
      <div className='user-gem__user-info'>
        <UserAvatar width={32} height={32} src={gem.userPhoto} />
        <div className='user-gem__details'>
          <div className='user-gem__username'>
            @
            <a
              href={`/user/@${gem.userName}`}
              target='_blank'
              rel='noreferrer'
              className='user-gem__username-link'
            >
              {gem.userName}
            </a>
          </div>
          <div className='user-gem__user-level'>
            <span>&#8226;</span>
            <span>{getTimeDifference(new Date(gem.updatedAt))}</span>
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

        <UserGemMenu gem={gem} />
      </div>
    </div>
  );
}

UserGemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemHeader;
