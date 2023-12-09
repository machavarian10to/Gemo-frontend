import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <NavLink to='/' className='logo-link'>
        <div className='logo'></div>
      </NavLink>
    </div>
  );
}

export default Header;
