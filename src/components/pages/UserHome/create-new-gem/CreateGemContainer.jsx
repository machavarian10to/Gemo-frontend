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

export default function CreatePostContainer({
  closeModal,
  activeTab,
  handleActiveTab,
}) {
  const [gemTitle, setGemTitle] = useState('');
  const [charCount, setCharCount] = useState(0);

  const [postTabState, setPostTabState] = useState({
    postContent: '',
    file: null,
    mediaSrc: null,
  });

  const [mediaTabState, setMediaTabState] = useState({
    file: null,
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
      selectedDuration: '3 days',
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
          name: '4 Days',
        },
        {
          id: useId(),
          name: '5 Days',
        },
      ],
    },
  });

  function clickHandler() {
    // TODO: send user data to server
    // closeModal();

    console.log(gemTitle);
    if (activeTab === 'post') {
      console.log(postTabState);
    } else if (activeTab === 'media') {
      console.log(mediaTabState);
    } else if (activeTab === 'poll') {
      console.log(pollTabState);
    }
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
          <div>Gif</div>
        </div>
      </div>

      <div className='active-tab-content'>
        <div className='post-title-wrapper'>
          <textarea
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
          <EventTabContent />
        ) : activeTab === 'gif' ? (
          <GifTabContent />
        ) : null}

        <Button
          fillContainer
          label='Post'
          state={charCount === 0 ? 'inactive' : 'active'}
          clickHandler={clickHandler}
        />
      </div>
    </div>
  );
}

CreatePostContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleActiveTab: PropTypes.func.isRequired,
};
