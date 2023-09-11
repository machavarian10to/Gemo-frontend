import Search from '@/components/UserHome/Search';
import SpeechBubble from '@/components/UserHome/SpeechBubble';

function UserHome() {
  return (
    <div className='user-home'>
      <div className='container-wrapper'>
        <SpeechBubble />
        <Search />
      </div>
    </div>
  );
}
export default UserHome;
