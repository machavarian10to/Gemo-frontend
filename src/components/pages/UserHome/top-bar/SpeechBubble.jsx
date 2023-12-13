import { useEffect, useState } from 'react';
import CreateGemModal from '../create-new-gem/CreateGemModal';
import UserAvatar from '@/components/shared/UserAvatar';

function SpeechBubble() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  return (
    <>
      <div className='speech-bubble-wrapper'>
        <UserAvatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s' />
        <div onClick={() => setShowModal(true)} className='speech-bubble'>
          What should I eat?
        </div>
      </div>
      {showModal && <CreateGemModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default SpeechBubble;
