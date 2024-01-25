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
        <UserAvatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s' />
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
