import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import UserAvatar from '@/components/shared/UserAvatar';

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
        <div>
          <GroupAddOutlinedIcon />
          <LocalGroceryStoreOutlinedIcon />
        </div>
        <UserAvatar
          size='30'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
        />
      </div>
    </div>
  );
}

export default Header;
