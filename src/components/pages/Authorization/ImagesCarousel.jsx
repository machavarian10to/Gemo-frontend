import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingAnimation from '@/components/animations/LoadingAnimation';

function ImagesCarousel() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=delicious+food&image_type=photo&per_page=10&orientation=vertical&category=food&safesearch=true&editors_choice=true`,
      )
      .then((res) => {
        const shuffledImages = res.data.hits.sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0) {
      const imgCurrent = new Image();
      imgCurrent.src = images[currentImage]?.webformatURL;

      const nextImage =
        currentImage === images.length - 1 ? 0 : currentImage + 1;
      const imgNext = new Image();
      imgNext.src = images[nextImage]?.webformatURL;
    }
  }, [images, currentImage]);

  return (
    <div className='user-home__auth-food-image-wrapper'>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div
          className='user-home__auth-food-image'
          style={{
            backgroundImage: `url(${images[currentImage]?.webformatURL})`,
          }}
        ></div>
      )}
    </div>
  );
}

export default ImagesCarousel;
