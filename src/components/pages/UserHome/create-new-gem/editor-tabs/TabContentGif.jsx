import { useState, useEffect, useRef } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

function TabContentGif({ gifTabState, setGifTabState }) {
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const gifContainerRef = useRef(null);

  const { t } = useTranslation();

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
      setGifTabState({ gifSrc: '', title: '' });
    }
    return;
  }

  function onGifSelect(gif) {
    setGifTabState({ gifSrc: gif.images.fixed_height.url, title: gif.title });
    gifContainerRef.current.scrollTop = 0;
  }

  return (
    <div className='gif-tab-container' ref={gifContainerRef}>
      <div className='search-gifs-wrapper' onKeyDown={searchGifs}>
        <Input
          value={searchValue}
          leftIcon={
            <SearchIcon
              style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
            />
          }
          size='small'
          placeholder={t('search_gif')}
          onInput={(e) => setSearchValue(e.target.value)}
        />
        {gifTabState.gifSrc ? (
          <div className='selected-gif-wrapper'>
            <div className='selected-gif'>
              <img src={gifTabState.gifSrc} alt={gifTabState.title} />
            </div>
            <button
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
                <>
                  <SkeletonTheme baseColor='var(--bg-main-color)'>
                    <Skeleton height={150} width={235} />
                    <Skeleton height={150} width={235} />
                  </SkeletonTheme>
                </>
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
