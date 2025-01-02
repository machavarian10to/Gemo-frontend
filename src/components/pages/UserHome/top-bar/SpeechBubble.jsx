import { useEffect, useState } from 'react';
import NewGemModal from '../create-new-gem/NewGemModal';
import UserAvatar from '@/components/shared/UserAvatar';
import CollectionsIcon from '@mui/icons-material/Collections';
import PollIcon from '@mui/icons-material/Poll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import GifBoxIcon from '@mui/icons-material/GifBox';
import { useTranslation } from 'react-i18next';

function SpeechBubble() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('post');

  const { t } = useTranslation();

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
        <div>
          <UserAvatar width={30} height={30} />
        </div>
        <div onClick={() => iconClickHandler('post')} className='speech-bubble'>
          {t('user_home.speech_bubble')}
        </div>
        <div className='user-home__speech-bubble-icons-wrapper'>
          <CollectionsIcon onClick={() => iconClickHandler('media')} />
          <PollIcon onClick={() => iconClickHandler('poll')} />
          {/* <EditCalendarIcon onClick={() => iconClickHandler('event')} /> */}
          <GifBoxIcon onClick={() => iconClickHandler('gif')} />
        </div>
      </div>
      {showModal && (
        <NewGemModal
          title={t('gem.new_gem')}
          closeModal={() => setShowModal(false)}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}
    </>
  );
}

export default SpeechBubble;
