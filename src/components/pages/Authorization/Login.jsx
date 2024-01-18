import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/UI/Input';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Checkbox from '@/components/UI/Checkbox';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '@/components/UI/Button';
import GoogleButton from '@/components/pages/Authorization/GoogleButton';
import { Fade } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Login({ setCurrentTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function onLogin() {
    setUsernameError('');
    setPasswordError('');
    if (!username) {
      setUsernameError('Username cannot be empty!');
      // return;
    }
    if (!password) {
      setPasswordError('Password cannot be empty!');
      // return;
    }
  }

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <h6>Welcome back! Please enter your details.</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            focused={usernameError ? true : false}
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            leftIcon={
              <AlternateEmailIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter username'
            state={usernameError ? 'danger' : 'active'}
            helperText={usernameError ? usernameError : null}
          />
          <div className='user-home__auth-password-input-wrapper'>
            <Input
              focused={passwordError ? true : false}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              leftIcon={
                <VpnKeyOutlinedIcon
                  style={{
                    color: 'var(--color-grey)',
                    fontSize: '18px',
                  }}
                />
              }
              placeholder='Enter password'
              state={passwordError ? 'danger' : 'active'}
              helperText={passwordError ? passwordError : null}
            />

            <div className='user-home__auth-password-eye'>
              {!showPassword ? (
                <RemoveRedEyeOutlinedIcon
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: 'var(--color-grey)', fontSize: '18px' }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: 'var(--color-grey)', fontSize: '18px' }}
                />
              )}
            </div>
          </div>

          <div className='user-home__auth-body-inputs-footer'>
            <div className='user-home__auth-remember-wrapper'>
              <Checkbox label='Remember me' />
            </div>

            <div className='user-home__auth-forgot-wrapper'>
              <span
                className='link'
                onClick={() => setCurrentTab('forget-password')}
              >
                Forgot password?
              </span>
            </div>
          </div>
          <Button label='Log in' clickHandler={onLogin} />
          <p className='user-home__auth-divider'>
            <span>or</span>
          </p>
          <GoogleButton />
          {/* <div className='user-home__auth-google-button'>
            <button>
            <div className='user-home__auth-google-img'></div>
            <span>Continue with google</span>
            </button>
        </div> */}

          <div className='user-home__auth-footer'>
            <span>Don&apos;t have an account?</span>
            <span className='link' onClick={() => setCurrentTab('register')}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </Fade>
  );
}

Login.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Login;
