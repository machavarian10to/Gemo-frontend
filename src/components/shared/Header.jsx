import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='header'>
      <NavLink to='/' className='logo-link'>
        <div className='logo'></div>
      </NavLink>

      <div className='header-search'>
        <Input
          leftIcon={
            <SearchIcon
              style={{ color: 'rgba(130, 130, 130, 0.6)', fontSize: '18px' }}
            />
          }
          value={searchValue}
          size='extra-small'
          type='text'
          placeholder='type @ to search people, type # to search recipes...'
          onInput={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className='user-info'>
        <div className='avatar'></div>
      </div>
    </div>
  );
}

export default Header;
