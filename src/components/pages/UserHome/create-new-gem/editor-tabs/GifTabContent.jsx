import { useState } from 'react';
import Fade from '@mui/material/Fade';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';

function GifTabContent() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Fade in={true} timeout={400}>
      <div className='gif-tab-container'>
        <div className='search-gifs-wrapper'>
          <Input
            value={searchValue}
            leftIcon={
              <SearchIcon
                style={{ color: 'rgba(130, 130, 130, 0.6)', fontSize: '22px' }}
              />
            }
            size='medium'
            placeholder='Search most delicious gifs...'
            onInput={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </Fade>
  );
}

export default GifTabContent;
