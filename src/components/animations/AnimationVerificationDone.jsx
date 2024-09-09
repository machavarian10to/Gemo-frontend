import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import VerificationDone from '@/assets/animations/verification-done.json';

function AnimationVerificationDone() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      animationData: VerificationDone,
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

export default AnimationVerificationDone;
