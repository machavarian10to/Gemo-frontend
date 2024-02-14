import { NavLink } from 'react-router-dom';
import ProgressBar from '@/components/UI/ProgressBar';
import UserAvatar from '@/components/shared/UserAvatar';
import { useSelector } from 'react-redux';

function UserCard() {
  const user = useSelector((state) => state.user);

  return (
    <div className='user-home_user-card'>
      <div className='user-home_user-card-avatar-wrapper'>
        <UserAvatar width={50} height={50} />
      </div>
      <NavLink to='/profile'>
        <div className='user-home_user-card-username'>@{user?.username}</div>
      </NavLink>
      <div className='divider'></div>
      <div className='user-home_user-card-level-bar-wrapper'>
        <div className='user-home_user-card-level-bar-details'>
          <div>{user?.level} cook</div>
          <div>{user?.levelPercent} %</div>
        </div>
        <ProgressBar level={user?.level} percent={user?.levelPercent} />
      </div>
    </div>
  );
}

export default UserCard;
