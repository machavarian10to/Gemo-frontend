import Fade from '@mui/material/Fade';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Input from '@/components/UI/Input';
import PropTypes from 'prop-types';

function TabContentEvent({ eventTabState, setEventTabState }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setEventTabState((prevState) => ({
        ...prevState,
        media: {
          ...prevState.media,
          file: file,
        },
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setEventTabState((prevState) => ({
          ...prevState,
          media: {
            ...prevState.media,
            mediaSrc: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function deleteMedia() {
    setEventTabState({
      ...eventTabState,
      media: {
        file: null,
        mediaSrc: null,
      },
    });
  }

  return (
    <Fade in={true} timeout={400}>
      <div className='event-tab-container'>
        {eventTabState.media.mediaSrc || eventTabState.media.fileSrc ? (
          <div className='media-wrapper'>
            <button className='delete-media-icon' onClick={deleteMedia}>
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
            {eventTabState.media.file?.type.includes('video') ? (
              <video
                controls
                src={eventTabState.media.mediaSrc}
                className='user-media-preview'
              />
            ) : (
              <img
                alt='user media preview'
                src={
                  eventTabState.media.mediaSrc ||
                  `${import.meta.env.VITE_API_URL}/assets/${
                    eventTabState.media.fileSrc
                  }`
                }
                className='user-media-preview'
              />
            )}
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
                style={{ color: 'var(--color-light-grey)', fontSize: '70px' }}
              />
              <p>choose photo for event</p>
            </div>
          </label>
        )}

        <div className='start-period-wrapper'>
          <div className='start-date'>
            <p>start date</p>
            <DateTimePicker
              onChange={(e) =>
                setEventTabState((prev) => ({
                  ...prev,
                  startDate: e,
                }))
              }
              value={eventTabState.startDate}
              calendarClassName='calendar'
              className='date-picker'
              clearIcon={null}
              minDate={new Date(Date.now() + 3600000)}
            />
          </div>
        </div>

        <div className='event-location-wrapper'>
          <Input
            size='extra-small'
            placeholder='Event location...'
            value={eventTabState.location}
            onInput={(e) =>
              setEventTabState((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />
        </div>

        <textarea
          value={eventTabState.description}
          onChange={(e) =>
            setEventTabState((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          maxLength={500}
          className='event-description'
          placeholder='Event description...'
        />
      </div>
    </Fade>
  );
}

TabContentEvent.propTypes = {
  eventTabState: PropTypes.object.isRequired,
  setEventTabState: PropTypes.func.isRequired,
};

export default TabContentEvent;
