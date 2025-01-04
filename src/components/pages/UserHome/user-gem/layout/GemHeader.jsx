import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PropTypes from 'prop-types';
import GemMenu from '@/components/pages/UserHome/user-gem/GemMenu';
import getTimeDifference from '@/helpers/getTimeDifference';
import getUserLevel from '@/helpers/getUserLevel';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';
function GemHeader({ gem }) {
  const { t } = useTranslation();
  const captureScreenshot = async () => {
    const gemElement = document.getElementById(`gem-${gem._id}`);
    if (!gemElement) return;

    try {
      const canvas = await html2canvas(gemElement, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        scale: 3,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `gem-${gem._id} ${new Date()}.png`;
      link.click();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className='user-gem__header'>
      <div className='user-gem__user-info'>
        <UserAvatar width={32} height={32} src={gem.author.profilePhoto} />
        <div className='user-gem__details'>
          <div className='user-gem__username'>
            <div>
              @
              <a
                href={`/user/@${gem.author.username}`}
                target='_blank'
                rel='noreferrer'
                className='user-gem__username-link'
              >
                {gem.author.username}
              </a>
            </div>

            <div className='user-gem__level'>
              <LocalPoliceOutlinedIcon
                style={{
                  color: getUserLevel(gem.author.levelDetails.type),
                  fontSize: '9px',
                }}
              />
            </div>
          </div>
          <div className='user-gem__user-date'>
            <span>&#8226;</span>
            <span data-title={new Date(gem.createdAt)}>
              {getTimeDifference(new Date(gem.createdAt), t)}
            </span>
          </div>
        </div>
      </div>

      <div className='user-gem__menu-options-wrapper'>
        {gem.updated && (
          <div className='user-gem__edited' title={new Date(gem.updatedAt)}>
            <CreateOutlinedIcon
              style={{ fontSize: '15px', color: 'var(--color-grey)' }}
            />
            <span>{t('edited')}</span>
          </div>
        )}

        <div className='user-gem_snapshot' onClick={captureScreenshot}>
          <CameraAltOutlinedIcon
            style={{
              fontSize: '22px',
              color: 'var(--color-grey)',
            }}
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
