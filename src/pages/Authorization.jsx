import { useState } from 'react';
import LoginPage from '@/components/pages/Authorization/LoginPage';
import RegisterPage from '@/components/pages/Authorization/RegisterPage';
import ForgetPassword from '@/components/pages/Authorization/ForgetPassword';
import NewPassword from '@/components/pages/Authorization/NewPassword';
import image from '@/assets/images/auth-food-image.jpg';

function Authorization() {
  const [currentTab, setCurrentTab] = useState('login');

  return (
    <div className='user-home__authorization'>
      <div className='user-home__auth-left'>
        <div className='user-home__auth-left-header'>
          <div className='user-home__auth-left-logo'>
            <img src='src/assets/images/gemo-logo.png' alt='logo' />
          </div>
        </div>

        <div className='user-home__auth-left-body'>
          {currentTab === 'login' && (
            <LoginPage setCurrentTab={setCurrentTab} />
          )}
          {currentTab === 'register' && (
            <RegisterPage setCurrentTab={setCurrentTab} />
          )}
          {currentTab === 'forget-password' && (
            <ForgetPassword setCurrentTab={setCurrentTab} />
          )}
          {currentTab === 'new-password' && (
            <NewPassword setCurrentTab={setCurrentTab} />
          )}
        </div>
      </div>

      <div className='user-home__auth-right'>
        <div className='user-home__auth-food-image-wrapper'>
          <img
            src={image}
            alt='food'
            className='user-home__auth-food-image'
            loading='lazy'
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
