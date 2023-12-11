import { useState } from 'react';
import Fade from '@mui/material/Fade';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function EventTabContent() {
  const [mediaSrc, setMediaSrc] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

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

        <div className='start-period-wrapper'>
          <div className='start-date'>
            <p>start date</p>
            <DateTimePicker
              onChange={setStartDate}
              value={startDate}
              calendarClassName='calendar'
              className='date-picker'
              clearIcon={null}
              minDate={new Date(Date.now() + 3600000)}
            />
          </div>
        </div>

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
