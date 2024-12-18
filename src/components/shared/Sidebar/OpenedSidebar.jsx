import React from 'react';
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
import { Fade } from '@mui/material';

function OpenedSidebar() {
  return (
    <Fade in={true} timeout={1000}>
      <div className='opened-sidebar'>
        <UserCard />
        <div className='navigation-wrapper'>
          <div className='navigation-container'>
            <NavLink to='/'>
              <LocalDiningOutlinedIcon />
              <span>Home</span>
            </NavLink>
            <NavLink to='/groups'>
              <PeopleAltOutlinedIcon />
              <span>Groups</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/bites'>
              <PlayCircleOutlinedIcon />
              <span>Bites</span>
            </NavLink>
            <NavLink to='/messages'>
              <EmailOutlinedIcon />
              <span>Messages</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/events'>
              <EventIcon />
              <span>Events</span>
            </NavLink>
            <NavLink to='/notifications'>
              <NotificationsOutlinedIcon />
              <span>Activities</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/settings'>
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </NavLink>
            <NavLink to='/favorites'>
              <GradeOutlinedIcon />
              <span>Favorites</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default OpenedSidebar;
