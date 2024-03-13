import { useState, useEffect, useRef } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';

function GifTabContent({ gifTabState, setGifTabState }) {
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState([]);

  const gifContainerRef = useRef(null);

  useEffect(() => {
    fetchGifs('cooking');
  }, []);

  function fetchGifs(searchValue) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${searchValue}&limit=20&offset=0&rating=g&lang=en`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGifs(data.data));
  }

  function searchGifs(e) {
    if (e.code === 'Enter') {
      if (searchValue === '') fetchGifs('cooking');
      fetchGifs(searchValue);
    }
    return;
  }

  function onGifSelect(gif) {
    setGifTabState(gif);
    gifContainerRef.current.scrollTop = 0;
  }

  return (
    <div className='gif-tab-container' ref={gifContainerRef}>
      <div className='search-gifs-wrapper' onKeyDown={searchGifs}>
        <Input
          value={searchValue}
          leftIcon={
            <SearchIcon
              style={{ color: 'rgba(130, 130, 130, 0.6)', fontSize: '18px' }}
            />
          }
          size='extra-small'
          placeholder='Search most delicious gifs...'
          onInput={(e) => setSearchValue(e.target.value)}
        />
        {gifTabState && (
          <div className='selected-gif-wrapper'>
            <h6>
              Selected Gif: <span>{gifTabState.title}</span>
            </h6>
            <div className='selected-gif'>
              <img
                src={gifTabState.images.fixed_height.url}
                alt={gifTabState.title}
              />
            </div>
            <button
              title='delete media'
              className='delete-media-icon'
              onClick={() => setGifTabState('')}
            >
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '15px' }}
              />
            </button>
          </div>
        )}
      </div>
      <Fade in={true} timeout={400}>
        <div className='gifs-wrapper'>
          {gifs.map((gif) => (
            <div className='gif' key={gif.id} onClick={() => onGifSelect(gif)}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}

GifTabContent.propTypes = {
  gifTabState: PropTypes.object.isRequired,
  setGifTabState: PropTypes.func.isRequired,
};

export default GifTabContent;
