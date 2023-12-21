import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';
import Post from '@/components/pages/UserHome/user-post/Post';
import Fade from '@mui/material/Fade';

function UserHome() {
  return (
    <Fade in={true} timeout={600}>
      <div className='user-home'>
        <div className='container-wrapper'>
          <SpeechBubble />

          <div className='post-wrapper'>
            <Post />
          </div>
        </div>
      </div>
    </Fade>
  );
}
export default UserHome;
