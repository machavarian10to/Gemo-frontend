import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import UserGemMenu from '@/components/pages/UserHome/user-gem/UserGemMenu';
import getTimeDifference from '@/helpers/getTimeDifference';

function UserGemHeader({ gem }) {
  const user = useSelector((state) => state.user);

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

        <UserGemMenu gem={gem} />
      </div>
    </div>
  );
}

UserGemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemHeader;
