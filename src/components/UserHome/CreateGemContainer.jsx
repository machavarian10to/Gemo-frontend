import { useState } from 'react';
import PropTypes from 'prop-types';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';
import PostTabContent from '@/components/UserHome/create-gem-tabs/PostTabContent';
import MediaTabContent from '@/components/UserHome/create-gem-tabs/MediaTabContent';
import PollTabContent from '@/components/UserHome/create-gem-tabs/PollTabContent';
import EventTabContent from '@/components/UserHome/create-gem-tabs/EventTabContent';
import GifTabContent from '@/components/UserHome/create-gem-tabs/GifTabContent';
import Button from '@/components/Button';

export default function CreatePostContainer({ closeModal }) {
  const [activeTab, setActiveTab] = useState('post');
  const [postTitle, setPostTitle] = useState('');
  const [charCount, setCharCount] = useState(0);

  function clickHandler() {
    closeModal();
  }

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function setTitle(e) {
    setCharCount(e.target.value.length);
    setPostTitle(e.target.value);
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
            value={postTitle}
          />
          <span>{charCount}/200</span>
        </div>

        {activeTab === 'post' ? (
          <PostTabContent />
        ) : activeTab === 'media' ? (
          <MediaTabContent />
        ) : activeTab === 'poll' ? (
          <PollTabContent />
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
};
