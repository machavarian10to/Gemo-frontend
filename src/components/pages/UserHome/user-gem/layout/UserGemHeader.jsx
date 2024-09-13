import { useState, useEffect } from 'react';
import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import PropTypes from 'prop-types';
import GemMenu from '@/components/pages/UserHome/user-gem/GemMenu';
import getTimeDifference from '@/helpers/getTimeDifference';
import axiosInstance from '@/services/axios';

function UserGemHeader({ gem }) {
  const [gemAuthor, setGemAuthor] = useState(null);

  useEffect(() => {
    async function fetchGemAuthor() {
      try {
        const { data } = await axiosInstance.get(`/api/users/${gem.userId}`);
        setGemAuthor(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGemAuthor();
  }, [gem.userId]);

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
    return userLevelMap[gemAuthor.levelType];
  }

  return (
    <>
      {gemAuthor ? (
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

            <GemMenu gem={gem} />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

UserGemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default UserGemHeader;
