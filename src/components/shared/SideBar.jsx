import { NavLink } from 'react-router-dom';
import UserCard from '@/components/shared/UserCard';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GradeIcon from '@mui/icons-material/Grade';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';

function SideBar() {
  return (
    <div className='sidebar'>
      <UserCard />

      <div className='navigation-wrapper'>
        <div className='navigation-container'>
          <NavLink to='/'>
            <HomeIcon />
            <span>Feed</span>
          </NavLink>
          <NavLink to='/discussion'>
            <GroupIcon />
            <span>Groups</span>
          </NavLink>
        </div>

        <div className='navigation-container'>
          <NavLink to='/notifications'>
            <NotificationsIcon />
            <span>Notifications</span>
          </NavLink>
          <NavLink to='/messages'>
            <SmsIcon />
            <span>Messages</span>
          </NavLink>
        </div>

        <div className='navigation-container'>
          <NavLink to='/watch'>
            <EventIcon />
            <span>Events</span>
          </NavLink>
          <NavLink to='/videos'>
            <OndemandVideoIcon />
            <span>Watch</span>
          </NavLink>
        </div>

        <div className='navigation-container'>
          <NavLink to='/settings'>
            <SettingsIcon />
            <span>Settings</span>
          </NavLink>
          <NavLink to='/saved'>
            <GradeIcon />
            <span>Saved</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
