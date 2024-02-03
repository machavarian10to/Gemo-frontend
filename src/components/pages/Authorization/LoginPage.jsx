import { useState, useEffect } from 'react';
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
import axios from 'axios';
import AlertBox from '@/components/UI/AlertBox';
function Login({ setCurrentTab }) {
  useEffect(() => {
    const emailVerified = localStorage.getItem('emailVerified');
    if (emailVerified === 'true') {
      setAlertBox({
        message: 'Email verified successfully!',
        type: 'success',
      });
      localStorage.removeItem('emailVerified');
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  function onUsernameInput(e) {
    setUsernameError('');
    setUsername(e.target.value);
  }

  function onPasswordInput(e) {
    setPasswordError('');
    setPassword(e.target.value);
  }

  function onUsernameBlur() {
    if (!username) {
      setUsernameError('Username should not be empty!');
    }
  }

  function onPasswordBlur() {
    if (!password) {
      setPasswordError('Password should not be empty!');
    }
  }

  function onLogin(e) {
    e.preventDefault();

    onUsernameBlur();
    onPasswordBlur();

    if (usernameError || passwordError || !username || !password) return;

    setIsButtonDisabled(true);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
        remember,
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = '/';
      })
      .catch((err) => {
        if (err.response) {
          const { message, type } = err.response.data;
          if (type === 'username') {
            setUsernameError(message);
          }
          if (type === 'password') {
            setPasswordError(message);
          }
          if (type === 'all') {
            setUsernameError(message);
            setPasswordError(message);
          }
        }
        if (err.message === 'Network Error') {
          setAlertBox({
            message: 'Network Error',
            type: 'error',
          });
        }
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={onLogin}>
        <h6>Welcome back! Please enter your details.</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            value={username}
            onInput={(e) => onUsernameInput(e)}
            onBlur={onUsernameBlur}
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onInput={(e) => onPasswordInput(e)}
              onBlur={onPasswordBlur}
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
              <Checkbox
                label='Remember me'
                checked={remember}
                onChange={() => setRemember((prev) => !prev)}
              />
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
          <Button
            submit
            label='Log in'
            clickHandler={onLogin}
            state={isButtonDisabled ? 'inactive' : 'active'}
          />
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

        {alertBox.message && (
          <AlertBox type={alertBox.type} message={alertBox.message} />
        )}
      </form>
    </Fade>
  );
}

Login.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Login;
