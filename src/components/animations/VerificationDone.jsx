import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import verificationDone from '@/assets/animations/verification-done.json';

function VerificationDone() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      animationData: verificationDone,
      container: container.current,
      loop: false,
      renderer: 'svg',
    });
  }, []);

  return (
    <div
      className='verification-dene-animation-container'
      ref={container}
    ></div>
  );
}

export default VerificationDone;
