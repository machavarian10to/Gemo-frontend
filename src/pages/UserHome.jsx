import SearchBar from '@/components/pages/UserHome/top-bar/SearchBar';
import SpeechBubble from '@/components/pages/UserHome/top-bar/SpeechBubble';

function UserHome() {
  return (
    <div className='user-home'>
      <div className='container-wrapper'>
        <SpeechBubble />
        <SearchBar />
      </div>
    </div>
  );
}
export default UserHome;
