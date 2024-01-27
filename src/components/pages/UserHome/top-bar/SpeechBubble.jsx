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
        <UserAvatar src='https://scontent.ftbs5-3.fna.fbcdn.net/v/t1.6435-1/31732324_878502372337372_8444703090384306176_n.jpg?stp=dst-jpg_p480x480&_nc_cat=107&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeHLL9eHBEgIA6pijxUYA3TXbIHL1KnP--FsgcvUqc_74TXxWbsxZ9yN8dhhUzG7_3g2o7-tQma62Sl2E_KxabeR&_nc_ohc=amdfO4pT21cAX8WCnsu&_nc_ht=scontent.ftbs5-3.fna&oh=00_AfAuIC2uYOD4CUv0OwheNEMRbrufmtbuVGXAws_kzC9X9g&oe=65DC2E7D' />
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
