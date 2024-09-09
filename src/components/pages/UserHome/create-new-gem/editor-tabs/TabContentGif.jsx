import { useState, useEffect, useRef } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import AnimationLoading from '@/components/animations/AnimationLoading';

function TabContentGif({ gifTabState, setGifTabState }) {
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const gifContainerRef = useRef(null);

  useEffect(() => {
    fetchGifs('cooking');
  }, []);

  function fetchGifs(searchValue) {
    setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${searchValue}&limit=50&offset=0&rating=pg-13&lang=en`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGifs(data.data);
        setLoading(false);
      });
  }

  function searchGifs(e) {
    if (e.code === 'Enter') {
      if (searchValue === '') fetchGifs('cooking');
      fetchGifs(searchValue);
      setGifTabState({ gif: '', title: '' });
    }
    return;
  }

  function onGifSelect(gif) {
    setGifTabState({ gif: gif.images.fixed_height.url, title: gif.title });
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
        {gifTabState.gif ? (
          <div className='selected-gif-wrapper'>
            <div className='selected-gif'>
              <img src={gifTabState.gif} alt={gifTabState.title} />
            </div>
            <button
              title='delete media'
              className='delete-media-icon'
              onClick={() => setGifTabState('')}
            >
              <HighlightOffIcon
                style={{ color: 'var(--color-main-yellow)', fontSize: '25px' }}
              />
            </button>
          </div>
        ) : (
          <Fade in={true} timeout={400}>
            <div className='gifs-wrapper'>
              {loading ? (
                <AnimationLoading />
              ) : (
                gifs.map((gif) => (
                  <div
                    className='gif'
                    key={gif.id}
                    onClick={() => onGifSelect(gif)}
                  >
                    <img src={gif.images.fixed_height.url} alt={gif.title} />
                  </div>
                ))
              )}
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

TabContentGif.propTypes = {
  gifTabState: PropTypes.object,
  setGifTabState: PropTypes.func,
};

export default TabContentGif;
