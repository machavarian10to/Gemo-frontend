import { useEffect, useState } from 'react';
import CreateGemModal from '../create-new-gem/CreateGemModal';

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
        <div className='avatar'></div>
        <div onClick={() => setShowModal(true)} className='speech-bubble'>
          What should I eat?
        </div>
      </div>
      {showModal && <CreateGemModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default SpeechBubble;
