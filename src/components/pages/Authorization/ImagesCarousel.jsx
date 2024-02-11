import { useState, useEffect } from 'react';
import axios from 'axios';

function ImagesCarousel() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=delicious+food&image_type=photo&per_page=200&orientation=vertical&category=food&safesearch=true&editors_choice=true`,
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

  return (
    <div className='user-home__auth-food-image-wrapper'>
      {loading ? (
        // TODO: Add a loader
        <div className='loader'>loading</div>
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
