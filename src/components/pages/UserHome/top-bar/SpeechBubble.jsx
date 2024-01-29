import { useEffect, useState } from 'react';
import CreateGemModal from '../create-new-gem/CreateGemModal';
import UserAvatar from '@/components/shared/UserAvatar';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';

function SpeechBubble() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('post');

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function iconClickHandler(iconName) {
    setShowModal(true);
    setActiveTab(iconName);
  }

  return (
    <>
      <div className='speech-bubble-wrapper'>
        <UserAvatar
          width={50}
          src='https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-1/415248429_3758616254371704_4772611569679784427_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=11e7ab&_nc_eui2=AeFHQIbliY8gUmuBhEviDzqSau-bMcOUzwpq75sxw5TPCni_L5QuVoYkh0_c4cfjO22t05Kf5aZGlmem6ts4S0GL&_nc_ohc=6QSD1tQsiJMAX8FQbZH&_nc_ht=scontent.ftbs6-2.fna&oh=00_AfBc48c58ytOBET5tNxxT5RpAk8s6L-Fu__CMrk8i8kfkA&oe=65BBF017'
        />
        <div onClick={() => iconClickHandler('post')} className='speech-bubble'>
          What should I eat?
        </div>
        <div className='user-home__speech-bubble-icons-wrapper'>
          <CollectionsIcon onClick={() => iconClickHandler('media')} />
          <PollIcon onClick={() => iconClickHandler('poll')} />
          <EditCalendarIcon onClick={() => iconClickHandler('event')} />
          <GifBoxIcon onClick={() => iconClickHandler('gif')} />
        </div>
      </div>
      {showModal && (
        <CreateGemModal
          closeModal={() => setShowModal(false)}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}
    </>
  );
}

export default SpeechBubble;
