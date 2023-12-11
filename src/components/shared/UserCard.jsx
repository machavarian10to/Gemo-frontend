import { NavLink } from 'react-router-dom';
import ProgressBar from '@/components/UI/ProgressBar';

function UserCard() {
  return (
    <div className='user-card'>
      <div className='avatar-wrapper'>
        <div className='avatar'></div>
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
