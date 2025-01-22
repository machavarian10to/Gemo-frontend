import useClickOutside from '@/hook/useClickOutside';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import HighQualityOutlinedIcon from '@mui/icons-material/HighQualityOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';

function VideoSettings({ setSettingsOpen, setSpeed }) {
  const settingsRef = useRef(null);

  const [speedOpen, setSpeedOpen] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);
  const [subtitlesOpen, setSubtitlesOpen] = useState(false);

  useClickOutside(settingsRef, () => {
    setSettingsOpen(false);
  });

  return (
    <div className='user-gem__video-settings' ref={settingsRef}>
      {speedOpen && (
        <>
          <div
            className='user-gem_video-back-btn'
            onClick={() => setSpeedOpen(false)}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '15px' }} />
            <span>Back</span>
          </div>

          <div className='user-gem__video-settings__speed'>
            <div
              className='user-gem__video-settings__speed__item'
              onClick={() => setSpeed(0.25)}
            >
              0.25x
            </div>
            <div
              className='user-gem__video-settings__speed__item'
              onClick={() => setSpeed(0.5)}
            >
              0.5x
            </div>
            <div
              className='user-gem__video-settings__speed__item'
              onClick={() => setSpeed(1)}
            >
              1x
            </div>
            <div
              className='user-gem__video-settings__speed__item'
              onClick={() => setSpeed(1.5)}
            >
              1.5x
            </div>
            <div
              className='user-gem__video-settings__speed__item'
              onClick={() => setSpeed(2)}
            >
              2x
            </div>
          </div>
        </>
      )}

      {qualityOpen && (
        <>
          <div
            className='user-gem_video-back-btn'
            onClick={() => setQualityOpen(false)}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '15px' }} />
            <span>Back</span>
          </div>

          <div className='user-gem__video-settings__quality'>
            <div className='user-gem__video-settings__quality__item'>1080p</div>
            <div className='user-gem__video-settings__quality__item'>720p</div>
            <div className='user-gem__video-settings__quality__item'>480p</div>
            <div className='user-gem__video-settings__quality__item'>360p</div>
          </div>
        </>
      )}

      {!speedOpen && !qualityOpen && !subtitlesOpen && (
        <>
          <div
            className='user-gem__video-settings__column'
            onClick={() => setSpeedOpen(true)}
          >
            <RocketLaunchOutlinedIcon style={{ fontSize: '20px' }} />
            <span>Speed</span>
          </div>
          <div
            className='user-gem__video-settings__column'
            onClick={() => setSubtitlesOpen(true)}
          >
            <SubtitlesOutlinedIcon style={{ fontSize: '19px' }} />
            <span>Subtitles</span>
          </div>
        </>
      )}

      <div className='user-gem_video-settings-arrow'></div>
    </div>
  );
}

VideoSettings.propTypes = {
  setSettingsOpen: PropTypes.func.isRequired,
  setSpeed: PropTypes.func.isRequired,
};

export default VideoSettings;
