import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import SettingsIcon from '@mui/icons-material/Settings';
import GradeIcon from '@mui/icons-material/Grade';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

function SideBar() {
  const [userName, setUserName] = useState('Otar Matchavariani');

  useEffect(() => {
    if (userName.length > 30) {
      setUserName(userName.slice(0, 25) + '...');
    }
  }, [userName]);

  return (
    <div className='sidebar'>
      <div className='user-profile'>
        <div className='user-avatar'>
          <img
            src='https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'
            alt='user-avatar'
          />
        </div>
        <span>{userName}</span>
      </div>

      <div className='navigation'>
        <ul>
          <li>
            <NavLink to='/'>
              <HomeIcon />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/discussion'>
              <GroupIcon />
              <span>Discussion</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/messages'>
              <SmsIcon />
              <span>Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/notifications'>
              <NotificationsIcon />
              <span>Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved'>
              <GradeIcon />
              <span>Saved</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/video'>
              <OndemandVideoIcon />
              <span>Video</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/events'>
              <EventIcon />
              <span> Events</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className='settings'>
        <NavLink to='/settings'>
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
