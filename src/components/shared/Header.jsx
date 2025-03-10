import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '@/components/UI/Input';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import UserAvatar from '@/components/shared/UserAvatar';
import ToggleTheme from '@/components/UI/ToggleTheme';
import Translator from '@/components/UI/Translator';
import { useDispatch } from 'react-redux';
import Fade from '@mui/material/Fade';
import useClickOutside from '@/hook/useClickOutside';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import { setLogout } from '@/state/index';
import { useSelector } from 'react-redux';
import { setMode } from '@/state/index';
import { useTranslation } from 'react-i18next';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const optionsWrapperRef = useRef(null);

  useClickOutside(optionsWrapperRef, () => {
    setShowOptions(false);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mode = useSelector((state) => state.mode);

  const { t } = useTranslation();

  return (
    <>
      <div className='header'>
        <NavLink to='/' className='logo-link'>
          <div className='logo' onClick={() => window.scrollTo(0, 0)}></div>
        </NavLink>
        <div className='header-search'>
          <Input
            leftIcon={
              <SearchIcon
                style={{
                  color: 'var(--color-main-grey)',
                  fontSize: '20px',
                }}
              />
            }
            name='search'
            value={searchValue}
            type='text'
            placeholder={t('header.search')}
            onInput={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='user-info'>
          <div>
            <GroupAddOutlinedIcon />
            <ArticleOutlinedIcon />
            <LocalGroceryStoreOutlinedIcon />
          </div>
          <div
            onClick={() => setShowOptions((prev) => !prev)}
            className='header-options-wrapper'
          >
            <UserAvatar width={30} height={30} />

            {showOptions && (
              <Fade timeout={500} in={true}>
                <div className='header-options' ref={optionsWrapperRef}>
                  <div
                    className='header-options-item'
                    onClick={() => navigate('/profile')}
                  >
                    <PermIdentityOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>{t('header.profile')}</span>
                  </div>

                  <div className='header-options-item'>
                    <EmojiEventsOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>{t('header.achievements')}</span>
                  </div>

                  <div className='header-options-item'>
                    <HelpOutlineOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>{t('header.help')}</span>
                  </div>

                  <div
                    className='header-options-item theme-toggle'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <LightModeOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                        marginRight: '13px',
                      }}
                    />
                    <ToggleTheme
                      isOn={mode === 'dark'}
                      onColor='var(--color-main-yellow)'
                      handleToggle={() => dispatch(setMode())}
                    />
                    <BedtimeOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                        marginLeft: '13px',
                      }}
                    />
                  </div>

                  <Translator />

                  <div
                    className='header-options-item'
                    onClick={() => dispatch(setLogout())}
                  >
                    <LogoutOutlinedIcon
                      style={{
                        fontSize: '22px',
                        color: 'var(--color-main-yellow)',
                      }}
                    />
                    <span>{t('header.logout')}</span>
                  </div>
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
