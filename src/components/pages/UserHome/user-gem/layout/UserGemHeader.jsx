import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import PropTypes from 'prop-types';
import GemMenu from '@/components/pages/UserHome/user-gem/GemMenu';
import getTimeDifference from '@/helpers/getTimeDifference';

function UserGemHeader({ gem, gemAuthor }) {
  function getUserLevel() {
    const userLevelMap = {
      novice: '#32cd32',
      home: '#ffd700',
      enthusiast: '#ff7f50',
      gourmet: '#4682b4',
      explorer: '#6a5acd',
      professional: '#808080',
      master: '#ffa500',
    };
    return userLevelMap[gemAuthor.levelType];
  }

  return (
    <div className='user-gem__header'>
      <div className='user-gem__user-info'>
        <UserAvatar width={32} height={32} src={gemAuthor.profilePhoto} />
        <div className='user-gem__details'>
          <div className='user-gem__username'>
            @
            <a
              href={`/user/@${gemAuthor.username}`}
              target='_blank'
              rel='noreferrer'
              className='user-gem__username-link'
            >
              {gemAuthor.username}
            </a>
          </div>
          <div className='user-gem__user-level'>
            <span>&#8226;</span>
            <span data-title={new Date(gem.createdAt)}>
              {getTimeDifference(new Date(gem.createdAt))}
            </span>
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

        <GemMenu gem={gem} gemAuthor={gemAuthor} />
      </div>
    </div>
  );
}

UserGemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
  gemAuthor: PropTypes.object.isRequired,
};

export default UserGemHeader;
