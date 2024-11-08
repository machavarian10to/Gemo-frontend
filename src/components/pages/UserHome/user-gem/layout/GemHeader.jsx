import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import PropTypes from 'prop-types';
import GemMenu from '@/components/pages/UserHome/user-gem/GemMenu';
import getTimeDifference from '@/helpers/getTimeDifference';
import getUserLevel from '@/helpers/getUserLevel';

function GemHeader({ gem }) {
  return (
    <div className='user-gem__header'>
      <div className='user-gem__user-info'>
        <UserAvatar width={32} height={32} src={gem.gemAuthor.profilePhoto} />
        <div className='user-gem__details'>
          <div className='user-gem__username'>
            <div>
              @
              <a
                href={`/user/@${gem.gemAuthor.username}`}
                target='_blank'
                rel='noreferrer'
                className='user-gem__username-link'
              >
                {gem.gemAuthor.username}
              </a>
            </div>

            <div className='user-gem__level'>
              <LocalPoliceOutlinedIcon
                style={{
                  color: getUserLevel(gem.gemAuthor.levelDetails.type),
                  fontSize: '9px',
                }}
              />
            </div>
          </div>
          <div className='user-gem__user-date'>
            <span>&#8226;</span>
            <span data-title={new Date(gem.createdAt)}>
              {getTimeDifference(new Date(gem.createdAt))}
            </span>
          </div>
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
  );
}

GemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemHeader;
