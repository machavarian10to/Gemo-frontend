import { NavLink } from 'react-router-dom';

function UserCard() {
  return (
    <div className='user-card'>
      <div className='avatar'></div>
      <NavLink to='/profile'>
        <div className='name'>@machavarian10to</div>
      </NavLink>
      <div>cook level here</div>
    </div>
  );
}

export default UserCard;
