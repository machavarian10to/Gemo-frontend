import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <NavLink to='/'>
        <div className='logo'></div>
      </NavLink>
    </div>
  );
}

export default Header;
