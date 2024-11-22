import React from 'react';
import { Fade } from '@mui/material';
import UserAvatar from '@/components/shared/UserAvatar';
import { NavLink } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import ProgressBar from '@/components/UI/ProgressBar';
import { useSelector } from 'react-redux';

function ClosedSidebar() {
  const user = useSelector((state) => state.user);
  return (
    <Fade in={true} timeout={1000}>
      <div className='closed-sidebar-wrapper'>
        <div className='closed-sidebar-avatar'>
          <UserAvatar width={40} height={40} />
          <div className='closed-sidebar-progress'>
            <ProgressBar
              level={user.levelDetails.type}
              percent={user.levelDetails.percent}
            />
          </div>
        </div>
        <div className='closed-sidebar-navbar'>
          <div className='closed-sidebar-link'>
            <NavLink to='/'>
              <LocalDiningOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/groups'>
              <PeopleAltOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/bites'>
              <PlayCircleOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/messages'>
              <EmailOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/events'>
              <EventIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/notifications'>
              <NotificationsOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/settings'>
              <SettingsOutlinedIcon />
            </NavLink>
          </div>
          <div className='closed-sidebar-link'>
            <NavLink to='/favorites'>
              <GradeOutlinedIcon />
            </NavLink>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default ClosedSidebar;
