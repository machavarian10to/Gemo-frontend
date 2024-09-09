import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import foodCarouselAnimation from '@/assets/animations/loading.json';

function AnimationLoading() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      animationData: foodCarouselAnimation,
      autoplay: true,
      container: container.current,
      loop: true,
      renderer: 'svg',
    });
  }, []);

  return <div ref={container} className='loading-animation-container'></div>;
}

export default AnimationLoading;
