import { NavLink } from 'react-router-dom';
import UserCard from '@/components/shared/UserCard';
import EventIcon from '@mui/icons-material/Event';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

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
              <span>Flavors</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/videos'>
              <PlayCircleOutlinedIcon />
              <span>Bites</span>
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
            <NavLink to='/notifications'>
              <NotificationsOutlinedIcon />
              <span>Activity</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/settings'>
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </NavLink>
            <NavLink to='/saved'>
              <GradeOutlinedIcon />
              <span>Favorites</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
