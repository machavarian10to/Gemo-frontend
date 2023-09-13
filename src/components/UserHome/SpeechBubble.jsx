import { useEffect, useState } from 'react';
import CreatePostModal from './CreatePostModal';

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
          <img
            // src='https://scontent.ftbs5-3.fna.fbcdn.net/v/t1.6435-1/31732324_878502372337372_8444703090384306176_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHLL9eHBEgIA6pijxUYA3TXbIHL1KnP--FsgcvUqc_74TXxWbsxZ9yN8dhhUzG7_3g2o7-tQma62Sl2E_KxabeR&_nc_ohc=wvpxxEUgnF8AX-o3hWN&_nc_ht=scontent.ftbs5-3.fna&oh=00_AfApaUGaKx3BsVYDRRyPKnVeUp3EZjo967TExyRG9ZONHQ&oe=6525263D'
            src='https://scontent.ftbs6-2.fna.fbcdn.net/v/t1.6435-1/94128061_3139216286122545_1193598147729817600_n.jpg?stp=c0.41.480.479a_dst-jpg_p480x480&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEZPL3Jxp24RwODCr_FYundOWusImno31U5a6wiaejfVbGRBInb5gkzrS0wD-YNlMoVlZjAbUDaF8qUGSQnZBPN&_nc_ohc=S_pHUS0uHgMAX-6nziO&_nc_ht=scontent.ftbs6-2.fna&oh=00_AfBV6lZMwJHdY0Wwx3aOjo6qi09cs_le3JpR7DQF1GBn5Q&oe=65290009'
            alt='user avatar'
          />
        </div>
        <div onClick={() => setShowModal(true)} className='speech-bubble'>
          What should I eat?
        </div>
      </div>

      {showModal && <CreatePostModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default SpeechBubble;
