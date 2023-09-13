import SearchBar from '@/components/UserHome/SearchBar';
import SpeechBubble from '@/components/UserHome/SpeechBubble';

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
