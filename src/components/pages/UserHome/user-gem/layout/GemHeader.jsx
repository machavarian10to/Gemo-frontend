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
import AlertBox from '@/components/UI/AlertBox';
import Tooltip from '@/components/UI/Tooltip';
import { useState } from 'react';
function GemHeader({ gem }) {
  const { t } = useTranslation();

  const [alertBox, setAlertBox] = useState({
    message: '',
    type: '',
  });

  const captureScreenshot = async () => {
    const gemElement = document.getElementById(gem._id);
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
      link.download = `${gem._id}.png`;
      link.click();
      setAlertBox({
        message: t('screenshot_captured'),
        type: 'success',
      });
    } catch (error) {
      setAlertBox({
        message: error.message,
        type: 'error',
      });
      console.error('Error capturing screenshot:', error);
    } finally {
      setTimeout(() => {
        setAlertBox({
          message: '',
          type: '',
        });
      }, 3000);
    }
  };

  function getGemDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <>
      {alertBox.message && (
        <AlertBox type={alertBox.type} message={alertBox.message} />
      )}

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
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
            <div className='user-gem__user-date'>
              <span>&#8226;</span>
              <Tooltip text={getGemDate(gem.createdAt)}>
                <span>{getTimeDifference(new Date(gem.createdAt), t)}</span>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className='user-gem__menu-options-wrapper'>
          {gem.updated && (
            <div className='user-gem__edited'>
              <CreateOutlinedIcon
                style={{ fontSize: '15px', color: 'var(--color-grey)' }}
              />
              <Tooltip text={getGemDate(gem.updatedAt)}>
                <span>{t('edited')}</span>
              </Tooltip>
            </div>
          )}

          <Tooltip text={t('screenshot')}>
            <div className='user-gem_snapshot' onClick={captureScreenshot}>
              <CameraAltOutlinedIcon
                style={{
                  fontSize: '22px',
                  color: 'var(--color-grey)',
                }}
              />
            </div>
          </Tooltip>

          <GemMenu gem={gem} />
        </div>
      </div>
    </>
  );
}

GemHeader.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default GemHeader;
