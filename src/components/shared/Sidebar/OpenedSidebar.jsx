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
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import { Fade } from '@mui/material';
import { useTranslation } from 'react-i18next';

function OpenedSidebar() {
  const { t } = useTranslation();

  return (
    <Fade in={true} timeout={1000}>
      <div className='opened-sidebar'>
        <UserCard />
        <div className='navigation-wrapper'>
          <div className='navigation-container'>
            <NavLink to='/'>
              <LocalDiningOutlinedIcon />
              <span>{t('sidebar.home')}</span>
            </NavLink>
            <NavLink to='/groups'>
              <PeopleAltOutlinedIcon />
              <span>{t('sidebar.groups')}</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/bites'>
              <PlayCircleOutlinedIcon />
              <span>{t('sidebar.bites')}</span>
            </NavLink>
            <NavLink to='/messages'>
              <EmailOutlinedIcon />
              <span>{t('sidebar.messages')}</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/diet-details'>
              <FastfoodOutlinedIcon />
              <span>{t('sidebar.events')}</span>
            </NavLink>
            <NavLink to='/notifications'>
              <NotificationsOutlinedIcon />
              <span>{t('sidebar.activities')}</span>
            </NavLink>
          </div>
          <div className='navigation-container'>
            <NavLink to='/settings'>
              <SettingsOutlinedIcon />
              <span>{t('sidebar.settings')}</span>
            </NavLink>
            <NavLink to='/favorites'>
              <GradeOutlinedIcon />
              <span>{t('sidebar.favorites')}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default OpenedSidebar;
