import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from './Input';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function GifContainer({ setGif, showGifs }) {
  useEffect(() => {
    fetchGifs('cooking');
  }, []);

  const [gifs, setGifs] = useState([]);
  const [searchGifValue, setSearchGifValue] = useState('');

  const { t } = useTranslation();

  function fetchGifs(searchValue) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${searchValue}&limit=50&offset=0&rating=pg-13&lang=en`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setGifs(data.data));
  }

  function searchGifs(e) {
    if (e.code === 'Enter') {
      if (!searchGifValue) fetchGifs('cooking');
      fetchGifs(searchGifValue);
    }
    return;
  }

  function onGifSelect(gif) {
    setGif((prev) => ({
      ...prev,
      media: {
        gifSrc: gif.images.fixed_height.url,
        file: null,
        mediaSrc: null,
      },
    }));
    showGifs((prev) => ({
      ...prev,
      gifs: false,
    }));
  }

  return (
    <div className='gif-container'>
      <div className='gtf-container-gif-tab'>
        <div className='search-gifs-wrapper' onKeyDown={searchGifs}>
          <Input
            value={searchGifValue}
            leftIcon={
              <SearchIcon
                style={{
                  color: 'var(--color-main-grey)',
                  fontSize: '18px',
                }}
              />
            }
            size='extra-small'
            placeholder={t('search_gif')}
            onInput={(e) => setSearchGifValue(e.target.value)}
          />
        </div>
        <div className='gifs-wrapper'>
          {gifs.map((gif) => (
            <div className='gif' key={gif.id} onClick={() => onGifSelect(gif)}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

GifContainer.propTypes = {
  setGif: PropTypes.func,
  showGifs: PropTypes.func,
};

export default GifContainer;
