import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import dishPreparation from '@/assets/animations/food-stirring.json';

function MealPrepareAnimation() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      animationData: dishPreparation,
      autoplay: true,
      container: container.current,
      loop: true,
      renderer: 'svg',
    });
  }, []);

  return (
    <div ref={container} className='meal-prepare-animation-container'></div>
  );
}

export default MealPrepareAnimation;
