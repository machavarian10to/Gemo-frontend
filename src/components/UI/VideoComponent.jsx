import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import VideoSettings from '@/components/pages/UserHome/user-gem/video-component/VideoSettings';
import AlertBox from '@/components/UI/AlertBox';
import logo from '@/assets/images/logo.png';

function VideoComponent({ src, poster, title = 'Video' }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [preview, setPreview] = useState(logo);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => setCurrentTime(video.currentTime);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', () => {
      setDuration(video.duration);
    });
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  function onPlayPauseClick() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prevState) => !prevState);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const handleHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const hoverTime =
      ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
    setHoverTime(hoverTime);
  };

  const handleSeekDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const seekTime = (offsetX / rect.width) * videoRef.current.duration;

    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.duration, seekTime),
    );
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeekMouseDown = (e) => {
    handleSeekDrag(e);

    const onMouseMove = (moveEvent) => {
      handleSeekDrag(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleVolumeToggle = () => {
    if (volume > 0) {
      videoRef.current.volume = 0;
      setVolume(0);
    } else {
      videoRef.current.volume = 1;
      setVolume(1);
    }
  };

  const handleVolumeMouseDown = (e) => {
    handleVolumeDrag(e);

    const onMouseMove = (moveEvent) => {
      handleVolumeDrag(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleVolumeDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    let newVolume = 1 - (e.clientY - rect.top) / rect.height;
    newVolume = Math.max(0, Math.min(1, newVolume));
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const setSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setSettingsOpen(false);
  };

  function onVideoDownload() {
    const videoBlob = new Blob([videoRef.current.src], { type: 'video/mp4' });
    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setAlert({
      message: 'Video downloaded successfully',
      type: 'success',
    });

    setTimeout(() => {
      setAlert({
        message: '',
        type: '',
      });
    }, 3000);
  }

  return (
    <>
      {alert.message && <AlertBox message={alert.message} type={alert.type} />}
      <div className='user-gem__video' onClick={onPlayPauseClick}>
        <video
          ref={videoRef}
          className='user-gem__video-element'
          src={src}
          poster={poster}
          title={title}
          crossOrigin='anonymous'
        />

        <div
          className='user-gem__video-controls'
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onPlayPauseClick}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
          <div
            className='user-gem__video-progress-bar'
            onMouseDown={handleSeekMouseDown}
            onMouseMove={handleHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            <div
              className='user-gem__video-progress'
              style={{ width: `${(currentTime / duration) * 100 + 1}%` }}
            ></div>
            {hoverTime && (
              <div
                className='hover-preview'
                style={{
                  left: `${(hoverTime / duration) * 100}%`,
                }}
              >
                <img alt='Preview' src={preview} />
                <span>{formatTime(hoverTime)}</span>
              </div>
            )}
          </div>
          <div className='time-display'>
            {formatTime(currentTime)} <span>/</span> {formatTime(duration)}
          </div>
          <div className='user-gem__video-options-wrapper'>
            <div className='user-gem__video-volume'>
              <button onClick={handleVolumeToggle}>
                {volume > 0 ? (
                  <VolumeUpOutlinedIcon />
                ) : (
                  <VolumeOffOutlinedIcon />
                )}
              </button>

              <div className='user-gem__video-volume-wrapper'>
                <div className='user-gem__video-volume-bar-wrapper'>
                  <div
                    className='user-gem__video-volume-bar'
                    onMouseDown={handleVolumeMouseDown}
                  >
                    <div
                      className='user-gem__video-volume-progress'
                      style={{
                        height: `${volume * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className='user-gem_video-volume-arrow'></div>
                </div>
              </div>
            </div>

            <div className='user-gem__video-settings-wrapper'>
              <button onClick={() => setSettingsOpen((preview) => !preview)}>
                <SettingsSuggestOutlinedIcon
                  style={{
                    fontSize: '25px',
                    margin: '0 0 3px 5px',
                  }}
                />
              </button>

              {settingsOpen && (
                <VideoSettings
                  setSettingsOpen={setSettingsOpen}
                  setSpeed={setSpeed}
                  onVideoDownload={onVideoDownload}
                />
              )}
            </div>

            <button onClick={() => videoRef.current.requestFullscreen()}>
              <FullscreenOutlinedIcon style={{ fontSize: '26px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

VideoComponent.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
};

export default VideoComponent;
