import { useState } from 'react';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '@/components/UI/Button';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function EventContainer({ gem }) {
  const user = useSelector((state) => state.user);
  const [event, setEvent] = useState(gem);

  function goingHandler() {
    const updatedEvent = {
      ...event,
      body: {
        ...event.body,
        going: [...event.body.going, { userId: user._id }],
      },
    };
    setEvent(updatedEvent);
  }

  function interestedHandler() {
    const updatedEvent = {
      ...event,
      body: {
        ...event.body,
        interested: [...event.body.interested, { userId: user._id }],
      },
    };
    setEvent(updatedEvent);
  }

  return (
    <div className='user-post__event-wrapper'>
      <div className='user-post__event-image'>
        {event.body?.fileName && (
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${
              event.body.fileName
            }`}
            alt='post'
          />
        )}
        <div className='user-post__event-icon'>
          <EventAvailableIcon style={{ color: '#fff' }} />
        </div>
      </div>

      <div className='user-post__info-wrapper'>
        <div className='user-post__event-header'>
          <div className='user-post__event'>
            <div className='user-post__event-date'>
              <AccessTimeIcon style={{ fontSize: '15px' }} />
              <div>{new Date(event.body.startDate).toLocaleString()}</div>
            </div>

            <div className='user-post__event-details'>
              <div className='user-post__event-details-location'>
                <LocationOnIcon style={{ fontSize: '15px' }} />
                <span>{event.body.location}</span>
              </div>
            </div>
          </div>

          <div className='user-post__event-attendance'>
            <div>
              <DirectionsWalkIcon style={{ fontSize: '20px' }} />
              <span>{event.body.going.length}</span>
            </div>
            <div>
              <RemoveRedEyeOutlinedIcon style={{ fontSize: '18px' }} />
              <span>{event.body.interested.length}</span>
            </div>
          </div>
        </div>

        <div className='user-post__event-description'>
          <p>{event.body.description}</p>
        </div>

        <div className='user-post__event-buttons-wrapper'>
          <Button
            label='Going'
            size='small'
            fillContainer
            leftIcon={
              <AddCircleOutlineOutlinedIcon style={{ fontSize: '20px' }} />
            }
            clickHandler={() => goingHandler(gem._id)}
          />

          <Button
            type='base'
            label='Interested'
            size='small'
            fillContainer
            leftIcon={<RemoveRedEyeOutlinedIcon style={{ fontSize: '20px' }} />}
            clickHandler={() => interestedHandler(gem._id)}
          />
        </div>
      </div>
    </div>
  );
}

EventContainer.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default EventContainer;
