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
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import axiosInstance from '@/services/axios';

function EventContainer({ gem }) {
  const user = useSelector((state) => state.user);
  const [event, setEvent] = useState(gem);
  const [isGoing, setIsGoing] = useState(
    gem.content.going.some((goingUser) => goingUser.userId === user._id),
  );
  const [isInterested, setIsInterested] = useState(
    gem.content.interested.some(
      (interestedUser) => interestedUser.userId === user._id,
    ),
  );
  function goingHandler() {
    setIsGoing(true);
    const updatedEvent = {
      ...event,
      content: {
        ...event.content,
        going: [...event.content.going, { userId: user._id }],
      },
    };
    setEvent(updatedEvent);
    axiosInstance
      .put(`/api/gems/${gem._id}`, updatedEvent)
      .catch((err) => console.error(err));
  }

  function interestedHandler() {
    setIsInterested(true);
    const updatedEvent = {
      ...event,
      content: {
        ...event.content,
        interested: [...event.content.interested, { userId: user._id }],
      },
    };
    setEvent(updatedEvent);
    axiosInstance
      .put(`/api/gems/${gem._id}`, updatedEvent)
      .catch((err) => console.error(err));
  }

  function notGoingHandler() {
    setIsGoing(false);
    const updatedEvent = {
      ...event,
      content: {
        ...event.content,
        going: event.content.going.filter(
          (goingUser) => goingUser.userId !== user._id,
        ),
      },
    };
    setEvent(updatedEvent);
    axiosInstance
      .put(`/api/gems/${gem._id}`, updatedEvent)
      .catch((err) => console.error(err));
  }

  function notInterestedHandler() {
    setIsInterested(false);
    const updatedEvent = {
      ...event,
      content: {
        ...event.content,
        interested: event.content.interested.filter(
          (interestedUser) => interestedUser.userId !== user._id,
        ),
      },
    };
    setEvent(updatedEvent);
    axiosInstance
      .put(`/api/gems/${gem._id}`, updatedEvent)
      .catch((err) => console.error(err));
  }

  return (
    <div className='user-gem__event-wrapper'>
      <div className='user-gem__event-image'>
        {event?.media?.fileSrc && (
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/${
              event.media.fileSrc
            }`}
            alt='post'
          />
        )}
        <div className='user-gem__event-icon'>
          <EventAvailableIcon style={{ color: '#fff' }} />
        </div>
      </div>

      <div className='user-gem__info-wrapper'>
        <div className='user-gem__event-header'>
          <div className='user-gem__event'>
            <div className='user-gem__event-date'>
              <AccessTimeIcon style={{ fontSize: '15px' }} />
              <div>{new Date(event.content.startDate).toLocaleString()}</div>
            </div>

            <div className='user-gem__event-details'>
              <div className='user-gem__event-details-location'>
                <LocationOnIcon style={{ fontSize: '15px' }} />
                <span>{event.content.location}</span>
              </div>
            </div>
          </div>

          <div className='user-gem__event-attendance'>
            <div>
              <DirectionsWalkIcon style={{ fontSize: '20px' }} />
              <span>{event.content.going.length}</span>
            </div>
            <div>
              <RemoveRedEyeOutlinedIcon style={{ fontSize: '18px' }} />
              <span>{event.content.interested.length}</span>
            </div>
          </div>
        </div>

        <div className='user-gem__event-description'>
          <p>{event.content.description}</p>
        </div>

        {!isGoing && !isInterested && (
          <div className='user-gem__event-buttons-wrapper'>
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
              leftIcon={
                <RemoveRedEyeOutlinedIcon style={{ fontSize: '20px' }} />
              }
              clickHandler={() => interestedHandler(gem._id)}
            />
          </div>
        )}

        {isGoing && (
          <div className='user-gem__event-buttons-wrapper'>
            <Button
              label='Not Going'
              size='small'
              fillContainer
              leftIcon={
                <HighlightOffOutlinedIcon style={{ fontSize: '20px' }} />
              }
              clickHandler={() => notGoingHandler()}
            />
          </div>
        )}

        {isInterested && (
          <div className='user-gem__event-buttons-wrapper'>
            <Button
              label='Not Interested'
              size='small'
              fillContainer
              leftIcon={
                <HighlightOffOutlinedIcon style={{ fontSize: '20px' }} />
              }
              clickHandler={() => notInterestedHandler()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

EventContainer.propTypes = {
  gem: PropTypes.object.isRequired,
};

export default EventContainer;
