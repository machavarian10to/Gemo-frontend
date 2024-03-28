import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '@/components/UI/Button';

function EventContainer() {
  return (
    <div className='user-post__event-wrapper'>
      <div className='user-post__event-image'>
        <img src='https://picsum.photos/500/300' alt='post' />
        <div className='user-post__event-icon'>
          <EventAvailableIcon style={{ color: '#fff' }} />
        </div>
      </div>

      <div className='user-post__info-wrapper'>
        <div className='user-post__event-header'>
          <div className='user-post__event'>
            <div className='user-post__event-date'>
              <AccessTimeIcon style={{ fontSize: '15px' }} />
              <div>Sat,</div>
              <div>Oct 30,</div>
              <div>8:00 PM</div>
            </div>

            <div className='user-post__event-details'>
              <div className='user-post__event-details-location'>
                <LocationOnIcon style={{ fontSize: '15px' }} />
                <span>1234 Street, City, State 12345</span>
              </div>
            </div>
          </div>

          <div className='user-post__event-attendance'>
            <DirectionsWalkIcon style={{ fontSize: '20px' }} />
            <span>3</span>
          </div>
        </div>

        <div className='user-post__event-description'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quibusdam, quas, voluptates, voluptatum quia quod doloribus
            voluptatem esse fugiat dolorum nemo. Quisquam quibusdam, quas,
            voluptates, voluptatum quia quod doloribus voluptatem esse fugiat
            dolorum nemo.
          </p>
        </div>

        <div className='user-post__event-attendees'>
          <Button
            label='Join'
            size='small'
            fillContainer
            leftIcon={
              <AddCircleOutlineOutlinedIcon style={{ fontSize: '20px' }} />
            }
          />

          <Button
            type='base'
            label='Watch'
            size='small'
            fillContainer
            leftIcon={<RemoveRedEyeOutlinedIcon style={{ fontSize: '20px' }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default EventContainer;
