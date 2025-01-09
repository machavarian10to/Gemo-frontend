import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [duration, setDuration] = useState(0);

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

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const seekTime =
      ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const hoverTime =
      ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
    setHoverTime(hoverTime);
  };

  return (
    <div className='user-gem__video' onClick={onPlayPauseClick}>
      <video
        ref={videoRef}
        className='user-gem__video-element'
        src={src}
        poster={poster}
        title={title}
      />

      <div
        className='user-gem__video-controls'
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onPlayPauseClick}>
          {isPlaying ? (
            <PauseIcon style={{ color: '#fff' }} />
          ) : (
            <PlayArrowIcon style={{ color: '#fff' }} />
          )}
        </button>
        <div
          className='user-gem__video-progress-bar'
          onClick={handleSeek}
          onMouseMove={handleHover}
          onMouseLeave={() => setHoverTime(null)}
        >
          <div
            className='user-gem__video-progress'
            style={{ width: `${(currentTime / duration) * 100 + 1}%` }}
          ></div>
          {hoverTime !== null && (
            <div
              className='hover-preview'
              style={{
                left: `${(hoverTime / duration) * 100}%`,
              }}
            >
              <img alt='Preview' src={poster} />
              <span>{formatTime(hoverTime)}</span>
            </div>
          )}
        </div>
        <div className='time-display'>
          {formatTime(currentTime)} <span>/</span> {formatTime(duration)}
        </div>
        <div className='user-gem__video-options-wrapper'>
          <button onClick={() => videoRef.current.requestFullscreen()}>
            <FullscreenOutlinedIcon style={{ color: '#fff' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
};

export default VideoPlayer;
