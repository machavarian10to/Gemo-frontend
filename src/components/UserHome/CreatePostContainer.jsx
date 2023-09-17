import { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';
import PostTabContent from '@/components/UserHome/Tabs/PostTabContent';
import MediaTabContent from '@/components/UserHome/Tabs/MediaTabContent';
import PollTabContent from '@/components/UserHome/Tabs/PollTabContent';
import EventTabContent from '@/components/UserHome/Tabs/EventTabContent';
import GifTabContent from '@/components/UserHome/Tabs/GifTabContent';

export default function CreatePostContainer() {
  const [activeTab, setActiveTab] = useState('post');

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
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
        <textarea
          className='title'
          placeholder='Post Title'
          maxLength={200}
        ></textarea>

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
