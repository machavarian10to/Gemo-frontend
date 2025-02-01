import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VideoSettings from '@/components/pages/UserHome/user-gem/video-component/VideoSettings';
import AlertBox from '@/components/UI/AlertBox';
import logo from '@/assets/images/logo.png';
import Fade from '@mui/material/Fade';

function VideoElement({ src, poster, title = 'Video' }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const progressBarWidth = isFullscreen ? '80%' : '45%';

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current;
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        video.classList.remove('fullscreen-video');
      } else {
        setIsFullscreen(true);
        video.classList.add('fullscreen-video');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  function handleFullscreen() {
    const videoContainer = videoRef.current.parentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    }
  }

  function onPlayPauseClick() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prevState) => !prevState);
    setShowPauseIcon(!isPlaying);
    setTimeout(() => {
      setShowPauseIcon(false);
    }, 500);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const handleHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const hoverTime = (hoverX / rect.width) * videoRef.current.duration;
    setHoverTime(Math.max(0, Math.min(videoRef.current.duration, hoverTime)));
  };

  const handleSeekDrag = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const seekTime = (offsetX / rect.width) * videoRef.current.duration;
    const clampedSeekTime = Math.max(
      0,
      Math.min(videoRef.current.duration, seekTime),
    );
    videoRef.current.currentTime = clampedSeekTime;
    setCurrentTime(clampedSeekTime);
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
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const newVolume = 1 - offsetY / rect.height;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    videoRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
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

        {!isPlaying && (
          <Fade in={true} timeout={500}>
            <div className='user-gem__video-playing'>
              <PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: '80px' }} />
            </div>
          </Fade>
        )}

        {showPauseIcon && (
          <div className='user-gem__video-playing'>
            <PauseCircleOutlineIcon style={{ fontSize: '80px' }} />
          </div>
        )}

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
            style={{ width: progressBarWidth }}
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
            <button className='fullscreen-button' onClick={handleFullscreen}>
              {isFullscreen ? (
                <FullscreenExitOutlinedIcon style={{ fontSize: '26px' }} />
              ) : (
                <FullscreenOutlinedIcon style={{ fontSize: '26px' }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

VideoElement.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
};

export default VideoElement;
