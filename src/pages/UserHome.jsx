import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import Post from '@/components/pages/UserHome/Post';

function UserHome() {
  return (
    <div className='user-home'>
      <div className='container-wrapper'>
        <SpeechBubble />

        <div className='post-wrapper'>
          <Post />
        </div>
      </div>
    </div>
  );
}
export default UserHome;
