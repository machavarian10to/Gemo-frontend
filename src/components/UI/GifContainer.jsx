import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from './Input';

function GifContainer() {
  useEffect(() => {
    fetchGifs('cooking');
  }, []);

  const [gifs, setGifs] = useState([]);
  const [searchGifValue, setSearchGifValue] = useState('');

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
      if (!searchGifValue) fetchGifs('cooking');
      fetchGifs(searchGifValue);
    }
    return;
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
                  color: 'rgba(130, 130, 130, 0.6)',
                  fontSize: '18px',
                }}
              />
            }
            size='extra-small'
            placeholder='Search most delicious gifs...'
            onInput={(e) => setSearchGifValue(e.target.value)}
          />
        </div>
        <div className='gifs-wrapper'>
          {gifs.map((gif) => (
            <div className='gif' key={gif.id}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GifContainer;
