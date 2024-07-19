import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import UserAvatar from '@/components/shared/UserAvatar';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/state/index';

function Header() {
  const [searchValue, setSearchValue] = useState('');

  // DELETE LATER
  const dispatch = useDispatch();

  return (
    <div className='header'>
      <NavLink to='/' className='logo-link'>
        <div className='logo' onClick={() => window.scrollTo(0, 0)}></div>
      </NavLink>
      <div className='header-search'>
        <Input
          leftIcon={
            <SearchIcon
              style={{ color: 'rgba(130, 130, 130, 0.6)', fontSize: '22px' }}
            />
          }
          name='search'
          size='large'
          value={searchValue}
          type='text'
          placeholder='Type @ to search users, type > to search groups...'
          onInput={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className='user-info'>
        <div>
          <GroupAddOutlinedIcon />
          <ArticleOutlinedIcon />
          <LocalGroceryStoreOutlinedIcon />
        </div>
        <UserAvatar width={30} height={30} />
        {/* FOR TESTING DELETE LATER */}
        <button onClick={() => dispatch(setLogout())}>log out</button>
        {/*  */}
      </div>
    </div>
  );
}

export default Header;
