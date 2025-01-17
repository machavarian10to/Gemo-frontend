import useClickOutside from '@/hook/useClickOutside';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

function VideoSettings({ setSettingsOpen }) {
  const settingsRef = useRef(null);

  useClickOutside(settingsRef, () => {
    setSettingsOpen(false);
  });

  return (
    <div className='user-gem__video-settings'>
      <div className='user-gem__video-settings__column'>
        <RocketLaunchOutlinedIcon style={{ fontSize: '20px' }} />
        <span>Speed</span>
      </div>
      <div className='user-gem__video-settings__column'>
        <RocketLaunchOutlinedIcon />
        <span>Speed</span>
      </div>
      <div className='user-gem__video-settings__column'>
        <RocketLaunchOutlinedIcon />
        <span>Speed</span>
      </div>

      <div className='user-gem_video-settings-arrow'></div>
    </div>
  );
}

VideoSettings.propTypes = {
  setSettingsOpen: PropTypes.func.isRequired,
};

export default VideoSettings;
