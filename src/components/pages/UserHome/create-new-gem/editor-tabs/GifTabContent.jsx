import { useState, useEffect } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';

function GifTabContent() {
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState([]);

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

  return (
    <div className='gif-tab-container'>
      <div className='search-gifs-wrapper' onKeyDown={searchGifs}>
        <Input
          value={searchValue}
          leftIcon={
            <SearchIcon
              style={{ color: 'rgba(130, 130, 130, 0.6)', fontSize: '22px' }}
            />
          }
          size='small'
          placeholder='Search most delicious gifs...'
          onInput={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Fade in={true} timeout={400}>
        <div className='gifs-wrapper'>
          {gifs.map((gif) => (
            <div className='gif' key={gif.id}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}

export default GifTabContent;
