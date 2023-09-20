import { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';
import PostTabContent from '@/components/UserHome/post-modal-tabs/PostTabContent';
import MediaTabContent from '@/components/UserHome/post-modal-tabs/MediaTabContent';
import PollTabContent from '@/components/UserHome/post-modal-tabs/PollTabContent';
import EventTabContent from '@/components/UserHome/post-modal-tabs/EventTabContent';
import GifTabContent from '@/components/UserHome/post-modal-tabs/GifTabContent';

export default function CreatePostContainer() {
  const [activeTab, setActiveTab] = useState('post');
  const [postTitle, setPostTitle] = useState('');
  const [charCount, setCharCount] = useState(0);

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function setTitle(e) {
    setCharCount(e.target.value.length);
    setPostTitle(e.target.value);

    if (e.target.value.length <= 50) {
      e.target.style.height = '35px';
    } else if (e.target.value.length > 50 && e.target.value.length <= 100) {
      e.target.style.height = '55px';
    } else if (e.target.value.length > 100 && e.target.value.length <= 150) {
      e.target.style.height = '65px';
    } else if (e.target.value.length > 150 && e.target.value.length <= 200) {
      e.target.style.height = '85px';
    }
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
            placeholder='Post Title'
            maxLength={200}
            onChange={(e) => setTitle(e)}
            value={postTitle}
          ></textarea>
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
      </div>
    </div>
  );
}
