import { NavLink } from 'react-router-dom';
import UserCard from '@/components/shared/UserCard';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EventIcon from '@mui/icons-material/Event';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function SideBar() {
  return (
    <div className='sidebar'>
      <div>
        <UserCard />
        <div className='navigation-wrapper'>
          <div className='navigation-container'>
            <NavLink to='/'>
              <LocalDiningOutlinedIcon />
              <span>Home</span>
            </NavLink>
            <NavLink to='/discussion'>
              <PeopleAltOutlinedIcon />
              <span>Groups</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/notifications'>
              <NotificationsOutlinedIcon />
              <span>Activity</span>
            </NavLink>
            <NavLink to='/messages'>
              <EmailOutlinedIcon />
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
            <NavLink to='/saved'>
              <GradeOutlinedIcon />
              <span>Favorites</span>
            </NavLink>
            <NavLink to='/settings'>
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
