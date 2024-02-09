import { useState, useEffect } from 'react';
import axios from 'axios';

function ImagesCarousel() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=food&image_type=photo&per_page=200&orientation=vertical&category=food`,
      )
      .then((res) => {
        const shuffledImages = res.data.hits.sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
        setLoaded(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='user-home__auth-food-image-wrapper'>
      <img
        src={images[currentImage]?.webformatURL}
        alt='food'
        className={`user-home__auth-food-image ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default ImagesCarousel;
