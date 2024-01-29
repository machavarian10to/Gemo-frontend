import { NavLink } from 'react-router-dom';
import ProgressBar from '@/components/UI/ProgressBar';
import UserAvatar from '@/components/shared/UserAvatar';

function UserCard() {
  return (
    <div className='user-card'>
      <div className='avatar-wrapper'>
        <UserAvatar
          width={50}
          height={50}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
        />
      </div>
      <NavLink to='/profile'>
        <div>@machavarian10to</div>
      </NavLink>
      <div className='divider'></div>
      <div className='level-bar-wrapper'>
        <div className='level-bar-details'>
          <div>Novice Cook</div>
          <div>52%</div>
        </div>
        <ProgressBar level='novice' percent='52' />
      </div>
    </div>
  );
}

export default UserCard;
