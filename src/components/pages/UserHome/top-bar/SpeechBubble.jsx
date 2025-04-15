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
      <div
        className='speech-bubble-wrapper'
        onClick={() => iconClickHandler('post')}
      >
        <div className='user-home__speech-bubble-header'>
          <div>
            <UserAvatar width={30} height={30} />
          </div>
          <div className='speech-bubble'>{t('speech_bubble.eat')}</div>
        </div>
        <div
          className='user-home__speech-bubble-icons-wrapper'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='user-home__speech-bubble-icon'
            onClick={() => iconClickHandler('media')}
          >
            <CollectionsIcon />
            <div>{t('speech_bubble.media')}</div>
          </div>
          <div
            className='user-home__speech-bubble-icon'
            onClick={() => iconClickHandler('poll')}
          >
            <PollIcon />
            <div>{t('speech_bubble.poll')}</div>
          </div>
          {/* <EditCalendarIcon onClick={() => iconClickHandler('event')} /> */}
          <div
            className='user-home__speech-bubble-icon'
            onClick={() => iconClickHandler('gif')}
          >
            <GifBoxIcon />
            <div>{t('speech_bubble.gif')}</div>
          </div>
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
