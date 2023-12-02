import { useState } from 'react';
import Fade from '@mui/material/Fade';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';

function EventTabContent() {
  const [mediaSrc, setMediaSrc] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Fade in={true} timeout={400}>
      <div className='event-tab-container'>
        <div className='start-period-wrapper'>
          <div className='start-date'>
            <p>start date</p>
            <input type='date' />
          </div>

          <div className='start-time'>
            <p>start time</p>
            <input type='time' />
          </div>
        </div>

        {mediaSrc ? (
          <div className='media-wrapper'>
            <button
              title='delete media'
              className='delete-media-icon'
              onClick={() => setMediaSrc(null)}
            >
              <HighlightOffIcon
                style={{ color: '#f9a109', fontSize: '25px' }}
              />
            </button>
            <img
              alt='user media preview'
              src={mediaSrc}
              className='user-media-preview'
            />
          </div>
        ) : (
          <label className='event-photo'>
            <input
              hidden
              type='file'
              accept='image/png, image/gif, image/jpeg, image/webp, video/mp4, video/quicktime'
              onChange={handleFileChange}
            />
            <div className='event-image-uploader'>
              <WallpaperOutlinedIcon
                style={{ color: '#ccc', fontSize: '70px' }}
              />
              <p>choose photo for event</p>
            </div>
          </label>
        )}

        <textarea
          maxLength={500}
          className='event-description'
          placeholder='Event description...'
        />
      </div>
    </Fade>
  );
}

export default EventTabContent;
