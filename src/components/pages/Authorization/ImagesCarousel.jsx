import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

function ImagesCarousel() {
  const [gifs, setGifs] = useState([]);
  const [currentGif, setCurrentGif] = useState(0);

  useEffect(() => {
    function fetchGifs(searchValue) {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&q=${searchValue}&rating=pg-13`;

      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => shuffleGifs(data));
    }

    function shuffleGifs(gifs) {
      const shuffledGifs = gifs.sort(() => Math.random() - 0.5);
      setGifs(shuffledGifs);
    }

    fetchGifs('cooking');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGif((prev) => (prev === gifs.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <>
      {gifs.length > 0 ? (
        <div className='user-home__auth-food-image-wrapper'>
          <div
            className='user-home__auth-food-image'
            style={{
              backgroundImage: `url(${gifs[currentGif].images.original.webp})`,
            }}
          ></div>
        </div>
      ) : (
        <div className='user-home__auth-food-image-wrapper'>
          <Skeleton height={'100%'} />
        </div>
      )}
    </>
  );
}

export default ImagesCarousel;
