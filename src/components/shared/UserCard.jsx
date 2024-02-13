import { NavLink } from 'react-router-dom';
import ProgressBar from '@/components/UI/ProgressBar';
import UserAvatar from '@/components/shared/UserAvatar';
import { useSelector } from 'react-redux';

function UserCard() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className='user-home_user-card'>
      <div className='user-home_user-card-avatar-wrapper'>
        <UserAvatar
          width={50}
          height={50}
          // src='https://picsum.photos/400/600'
          src={user?.profilePicture || 'https://picsum.photos/400/600'}
        />
      </div>
      <NavLink to='/profile'>
        <div className='user-home_user-card-username'>@{user?.username}</div>
      </NavLink>
      <div className='divider'></div>
      <div className='user-home_user-card-level-bar-wrapper'>
        <div className='user-home_user-card-level-bar-details'>
          <div>{user?.level} cook</div>
          <div>52%</div>
        </div>
        <ProgressBar level={user?.level} percent='52' />
      </div>
    </div>
  );
}

export default UserCard;
