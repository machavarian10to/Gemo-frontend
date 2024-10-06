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
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/state/index';
import authService from '@/services/authService';

function Login({ setCurrentTab }) {
  const dispatch = useDispatch();
  const resetPasswordToken = useSelector((state) => state.resetToken);

  useEffect(() => {
    if (resetPasswordToken) {
      return setCurrentTab('new-password');
    }
  }, [setCurrentTab, resetPasswordToken]);

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    remember: false,
    showPassword: false,
    isButtonDisabled: false,
  });

  function onUsernameInput(e) {
    setFormState((prev) => ({
      ...prev,
      usernameError: '',
      username: e.target.value,
    }));
  }

  function onPasswordInput(e) {
    setFormState((prev) => ({
      ...prev,
      passwordError: '',
      password: e.target.value,
    }));
  }

  function onUsernameBlur() {
    if (!formState.username.trim()) {
      setFormState((prev) => ({
        ...prev,
        usernameError: 'Username should not be empty!',
      }));
    }
  }

  function onPasswordBlur() {
    if (!formState.password.trim()) {
      setFormState((prev) => ({
        ...prev,
        passwordError: 'Password should not be empty!',
      }));
    }
  }

  function onLogin(e) {
    e.preventDefault();

    onUsernameBlur();
    onPasswordBlur();

    if (
      formState.usernameError ||
      formState.passwordError ||
      !formState.username.trim() ||
      !formState.password.trim()
    )
      return;

    setFormState((prev) => ({ ...prev, isButtonDisabled: true }));

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username: formState.username,
        password: formState.password,
        remember: formState.remember,
      })
      .then((res) => {
        const { user, token } = res.data;
        authService.setToken('accessToken', token);
        dispatch(setLogin({ user }));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          const { message, type } = err.response.data;
          if (type === 'username') {
            setFormState((prev) => ({
              ...prev,
              usernameError: message,
            }));
          }
          if (type === 'password') {
            setFormState((prev) => ({
              ...prev,
              passwordError: message,
            }));
          }
          if (type === 'all') {
            setFormState((prev) => ({
              ...prev,
              usernameError: message,
              passwordError: message,
            }));
          }
        }
      })
      .finally(() => {
        setFormState((prev) => ({
          ...prev,
          isButtonDisabled: false,
        }));
      });
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={onLogin}>
        <h6>Welcome back! Please enter your details.</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            value={formState.username}
            onInput={(e) => onUsernameInput(e)}
            onBlur={onUsernameBlur}
            leftIcon={
              <AlternateEmailIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter username'
            state={formState.usernameError ? 'danger' : 'active'}
            helperText={
              formState.usernameError ? formState.usernameError : null
            }
          />
          <div className='user-home__auth-password-input-wrapper'>
            <Input
              type={formState.showPassword ? 'text' : 'password'}
              value={formState.password}
              onInput={(e) => onPasswordInput(e)}
              onBlur={onPasswordBlur}
              leftIcon={
                <VpnKeyOutlinedIcon
                  style={{
                    color: 'var(--color-main-grey)',
                    fontSize: '18px',
                  }}
                />
              }
              placeholder='Enter password'
              state={formState.passwordError ? 'danger' : 'active'}
              helperText={
                formState.passwordError ? formState.passwordError : null
              }
            />

            <div className='user-home__auth-password-eye'>
              {!formState.showPassword ? (
                <RemoveRedEyeOutlinedIcon
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
                />
              )}
            </div>
          </div>

          <div className='user-home__auth-body-inputs-footer'>
            <div className='user-home__auth-remember-wrapper'>
              <Checkbox
                label='Remember me'
                checked={formState.remember}
                onChange={() =>
                  setFormState((prev) => ({
                    ...prev,
                    remember: !prev.remember,
                  }))
                }
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
            state={formState.isButtonDisabled ? 'inactive' : 'active'}
          />
          <p className='user-home__auth-divider'>
            <span>or</span>
          </p>
          <GoogleButton
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_API_URL
              }/auth/google`)
            }
          />
          <div className='user-home__auth-footer'>
            <span>Don&apos;t have an account?</span>
            <span className='link' onClick={() => setCurrentTab('register')}>
              Sign up
            </span>
          </div>
        </div>
      </form>
    </Fade>
  );
}

Login.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Login;
