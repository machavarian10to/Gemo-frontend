import { useState } from 'react';
import LoginPage from '@/components/pages/Authorization/LoginPage';
import RegisterPage from '@/components/pages/Authorization/RegisterPage';
import ForgetPassword from '@/components/pages/Authorization/ForgetPassword';

function Authorization() {
  const [currentTab, setCurrentTab] = useState('login');

  return (
    <div className='user-home__authorization'>
      <div className='user-home__auth-left'>
        <div className='user-home__auth-left-header'>
          <div className='user-home__auth-left-logo'>
            <img src='src/assets/images/logo.png' alt='logo' />
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
        </div>
      </div>

      <div className='user-home__auth-right'></div>
    </div>
  );
}

export default Authorization;
