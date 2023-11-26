import Fade from '@mui/material/Fade';

function EventTabContent() {
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

        <textarea
          maxLength={500}
          className='event-description'
          placeholder='Event description...'
        />

        <label htmlFor='event-photo' className='event-photo-label'>
          choose photo for event
        </label>
        <input type='file' hidden id='event-photo' />
      </div>
    </Fade>
  );
}

export default EventTabContent;
