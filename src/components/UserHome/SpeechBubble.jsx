import { useEffect, useState } from 'react';
import CreateGemModal from './CreateGemModal';

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
        <div className='avatar'>
          {/* <img
            src='https://scontent.ftbs5-2.fna.fbcdn.net/v/t31.18172-8/22555593_2043481365881944_1848984884889756625_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=nDgolxega2YAX_pUVSD&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfBrX8H3BGuZGr5InXnOnZY_XmgaaiHZe_ewKWZAeJ8I1g&oe=652CE053'
            alt='user avatar'
          /> */}
        </div>
        <div onClick={() => setShowModal(true)} className='speech-bubble'>
          What should I eat?
        </div>
      </div>
      {showModal && <CreateGemModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default SpeechBubble;
