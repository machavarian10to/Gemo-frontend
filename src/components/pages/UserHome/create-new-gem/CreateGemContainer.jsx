import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';
import PostTabContent from '@/components/pages/UserHome/create-new-gem/editor-tabs/PostTabContent';
import MediaTabContent from '@/components/pages/UserHome/create-new-gem/editor-tabs/MediaTabContent';
import PollTabContent from '@/components/pages/UserHome/create-new-gem/editor-tabs/PollTabContent';
import EventTabContent from '@/components/pages/UserHome/create-new-gem/editor-tabs/EventTabContent';
import GifTabContent from '@/components/pages/UserHome/create-new-gem/editor-tabs/GifTabContent';
import Button from '@/components/UI/Button';
import axios from '@/services/axios';
import { useSelector } from 'react-redux';
import AlertBox from '@/components/UI/AlertBox';

export default function CreatePostContainer({
  closeModal,
  activeTab,
  handleActiveTab,
}) {
  const user = useSelector((state) => state.user);

  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [gemTitle, setGemTitle] = useState('');
  const [charCount, setCharCount] = useState(0);

  const [postTabState, setPostTabState] = useState({
    postContent: null,
    file: null,
    fileName: null,
    mediaSrc: null,
    gifSrc: null,
  });

  const [mediaTabState, setMediaTabState] = useState({
    file: null,
    fileName: null,
    mediaSrc: null,
  });

  const [pollTabState, setPollTabState] = useState({
    pollOptions: [
      {
        id: useId(),
        value: '',
        placeholder: 'Option 1',
        deleteIcon: false,
      },
      {
        id: useId(),
        value: '',
        placeholder: 'Option 2',
        deleteIcon: false,
      },
    ],
    pollDurations: {
      showDurations: false,
      selectedDuration: '- None -',
      options: [
        {
          id: useId(),
          name: '1 Day',
        },
        {
          id: useId(),
          name: '2 Days',
        },
        {
          id: useId(),
          name: '3 Days',
          selected: true,
        },
        {
          id: useId(),
          name: '7 Days',
        },
        {
          id: useId(),
          name: '- None -',
        },
      ],
    },
  });

  const [eventTabState, setEventTabState] = useState({
    file: null,
    fileName: null,
    mediaSrc: null,
    startDate: null,
    location: '',
    description: '',
  });

  const [gifTabState, setGifTabState] = useState({
    gif: '',
    title: '',
  });

  async function clickHandler() {
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('userName', user.username);
    formData.append('userPhoto', user.profilePicture);
    formData.append('title', gemTitle.trim());
    formData.append('type', activeTab);

    if (activeTab === 'post') {
      if (postTabState.file) formData.append('file', postTabState.file);
      const state = {};
      const postTabStateKeys = Object.keys(postTabState);
      postTabStateKeys.forEach((key) => {
        if (postTabState[key] && key !== 'file' && key !== 'mediaSrc') {
          state[key] = postTabState[key];
        }
      });
      if (Object.keys(state).length !== 0) {
        formData.append('desc', JSON.stringify(state));
      }
    } else if (activeTab === 'media') {
      if (mediaTabState.file) {
        formData.append('file', mediaTabState.file);
        formData.append(
          'desc',
          JSON.stringify({ fileName: mediaTabState.fileName }),
        );
      }
    } else if (activeTab === 'poll') {
      const state = {
        pollOptions: [],
        pollDuration: pollTabState.pollDurations.selectedDuration,
      };
      pollTabState.pollOptions.forEach((option) => {
        if (option.value) {
          state.pollOptions.push({
            id: option.id,
            value: option.value,
            users: [],
          });
        }
      });
      if (state.pollOptions.length !== 0) {
        formData.append('desc', JSON.stringify(state));
      }
    } else if (activeTab === 'event') {
      if (eventTabState.file) formData.append('file', eventTabState.file);
      const state = {};
      const eventTabStateKeys = Object.keys(eventTabState);
      eventTabStateKeys.forEach((key) => {
        if (eventTabState[key] && key !== 'file' && key !== 'mediaSrc') {
          state[key] = eventTabState[key];
        }
      });
      if (Object.keys(state).length !== 0) {
        formData.append('desc', JSON.stringify(state));
      }
    } else if (activeTab === 'gif') {
      if (gifTabState.gif) {
        formData.append('desc', JSON.stringify(gifTabState));
      }
    }

    try {
      await axios.post('/api/gems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({
        message: 'Gem created successfully!',
        type: 'success',
      });
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        type: 'error',
      });
    }
    setIsButtonDisabled(false);
  }

  function setTitle(e) {
    setCharCount(e.target.value.length);
    setGemTitle(e.target.value);
  }

  return (
    <div className='create-post-container'>
      <div className='post-container-header'>
        <div
          className={`post ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => handleActiveTab('post')}
        >
          <PostAddIcon style={{ fontSize: '17px' }} />
          <div>Post</div>
        </div>

        <div
          className={`media ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => handleActiveTab('media')}
        >
          <CollectionsIcon style={{ fontSize: '17px' }} />
          <div>Media</div>
        </div>

        <div
          className={`poll ${activeTab === 'poll' ? 'active' : ''}`}
          onClick={() => handleActiveTab('poll')}
        >
          <PollIcon style={{ fontSize: '17px' }} />
          <div>Poll</div>
        </div>

        <div
          className={`event ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => handleActiveTab('event')}
        >
          <EditCalendarIcon style={{ fontSize: '17px' }} />
          <div>Event</div>
        </div>

        <div
          className={`gif ${activeTab === 'gif' ? 'active' : ''}`}
          onClick={() => handleActiveTab('gif')}
        >
          <GifBoxIcon style={{ fontSize: '17px' }} />
          <div>Gifs</div>
        </div>
      </div>

      <div className='active-tab-content'>
        <div className='post-title-wrapper'>
          <textarea
            name='post-title'
            className='title'
            placeholder='Title'
            maxLength={200}
            onChange={(e) => setTitle(e)}
            value={gemTitle}
          />
          <span>{charCount}/200</span>
        </div>

        {activeTab === 'post' ? (
          <PostTabContent
            postTabState={postTabState}
            setPostTabState={setPostTabState}
          />
        ) : activeTab === 'media' ? (
          <MediaTabContent
            mediaTabState={mediaTabState}
            setMediaTabState={setMediaTabState}
          />
        ) : activeTab === 'poll' ? (
          <PollTabContent
            pollTabState={pollTabState}
            setPollTabState={setPollTabState}
          />
        ) : activeTab === 'event' ? (
          <EventTabContent
            eventTabState={eventTabState}
            setEventTabState={setEventTabState}
          />
        ) : activeTab === 'gif' ? (
          <GifTabContent
            gifTabState={gifTabState}
            setGifTabState={setGifTabState}
          />
        ) : null}

        <Button
          fillContainer
          label='Post'
          state={
            charCount === 0 || gemTitle.trim() === '' || isButtonDisabled
              ? 'inactive'
              : 'active'
          }
          clickHandler={clickHandler}
        />
      </div>

      {alert.message && <AlertBox message={alert.message} type={alert.type} />}
    </div>
  );
}

CreatePostContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleActiveTab: PropTypes.func.isRequired,
};
