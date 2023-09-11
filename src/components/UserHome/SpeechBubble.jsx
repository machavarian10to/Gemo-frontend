import { useState } from 'react';

function SpeechBubble() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <div className='speech-bubble-wrapper'>
        <div className='speech-bubble-avatar'>
          <img
            src='https://scontent.ftbs5-3.fna.fbcdn.net/v/t1.6435-1/31732324_878502372337372_8444703090384306176_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHLL9eHBEgIA6pijxUYA3TXbIHL1KnP--FsgcvUqc_74TXxWbsxZ9yN8dhhUzG7_3g2o7-tQma62Sl2E_KxabeR&_nc_ohc=wvpxxEUgnF8AX-o3hWN&_nc_ht=scontent.ftbs5-3.fna&oh=00_AfApaUGaKx3BsVYDRRyPKnVeUp3EZjo967TExyRG9ZONHQ&oe=6525263D'
            alt='user avatar'
          />
        </div>
        <div onClick={toggleModal} className='speech-bubble'>
          What should I eat?
        </div>
      </div>

      <dialog className='dialog' open={showModal}>
        <form method='dialog'>
          <input type='text' />
          <button type='submit'>Submit</button>
        </form>
      </dialog>
    </>
  );
}

export default SpeechBubble;
