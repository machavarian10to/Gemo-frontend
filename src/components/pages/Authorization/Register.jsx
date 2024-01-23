import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/UI/Input';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ProgressBar from '@/components/UI/ProgressBar';
import Button from '@/components/UI/Button';
import { Fade } from '@mui/material';

function Register({ setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const [passwordStrength, setPasswordStrength] = useState('');

  function isValidEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function checkEmail() {
    if (!email) {
      setEmailError('Email should not be empty!');
      return;
    }
    if (!isValidEmail()) {
      setEmailError('Email is invalid!');
      return;
    }
  }

  function onEmailInput(e) {
    setEmailError('');
    setEmail(e.target.value);
  }

  function onUsernameInput(e) {
    setUsernameError('');
    setUsername(e.target.value);
  }

  function onPasswordInput(e) {
    setPasswordError('');
    setPassword(e.target.value);

    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );

    const normalRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})',
    );

    if (strongRegex.test(e.target.value)) {
      setPasswordStrength('Strong');
    }

    if (normalRegex.test(e.target.value)) {
      setPasswordStrength('Normal');
    }

    if (e.target.value.length < 6) {
      setPasswordStrength('Weak');
    }
  }

  function onRepeatPasswordInput(e) {
    setRepeatPasswordError('');
    setRepeatPassword(e.target.value);
  }

  function onUsernameBlur() {
    if (!username) {
      setUsernameError('Username should not be empty!');
    }
  }

  function onPasswordBlur() {
    if (!password) {
      setPasswordError('Password should not be empty!');
      setPasswordStrength('');
    }
  }

  function onRepeatPasswordBlur() {
    if (!repeatPassword) {
      setRepeatPasswordError('Repeat password should not be empty!');
    }
    if (repeatPassword !== password) {
      setRepeatPasswordError('Passwords do not match!');
    }
  }

  function onRegister(e) {
    e.preventDefault();

    checkEmail();
    onUsernameBlur();
    onPasswordBlur();
    onRepeatPasswordBlur();
  }

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <h6>Create an account, Start your journey!</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            onInput={onEmailInput}
            onBlur={checkEmail}
            value={email}
            state={emailError ? 'danger' : 'active'}
            helperText={emailError}
            type='email'
            placeholder='Enter email'
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
          />
          <Input
            onInput={onUsernameInput}
            onBlur={onUsernameBlur}
            value={username}
            state={usernameError ? 'danger' : 'active'}
            helperText={usernameError}
            leftIcon={
              <AlternateEmailIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter username'
          />
          <Input
            onInput={onPasswordInput}
            onBlur={onPasswordBlur}
            value={password}
            state={passwordError ? 'danger' : 'active'}
            helperText={passwordError}
            type='password'
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter password'
          />
          <div className='user-home__auth-password-checker'>
            <div className='user-home__auth-password-progressbar'>
              <ProgressBar
                percent='100'
                color={
                  passwordStrength === 'Weak'
                    ? 'var(--bg-main-red)'
                    : passwordStrength === 'Normal'
                    ? 'var(--color-yellow-shade-04)'
                    : passwordStrength === 'Strong'
                    ? '#62baac'
                    : ''
                }
              />
              <ProgressBar
                percent='100'
                color={
                  passwordStrength === 'Normal'
                    ? 'var(--color-yellow-shade-04)'
                    : passwordStrength === 'Strong'
                    ? '#62baac'
                    : ''
                }
              />
              <ProgressBar
                percent='100'
                color={passwordStrength === 'Strong' ? '#62baac' : ''}
              />
            </div>
            <div className='user-home__auth-password-strength'>
              <Fade in={passwordStrength} timeout={800}>
                <span
                  style={
                    passwordStrength === 'Weak'
                      ? { color: 'var(--bg-main-red)' }
                      : passwordStrength === 'Normal'
                      ? { color: 'var(--color-yellow-shade-04)' }
                      : passwordStrength === 'Strong'
                      ? { color: '#62baac' }
                      : ''
                  }
                >
                  {passwordStrength}
                </span>
              </Fade>
            </div>
          </div>
          <Input
            onInput={onRepeatPasswordInput}
            onBlur={onRepeatPasswordBlur}
            value={repeatPassword}
            state={repeatPasswordError ? 'danger' : 'active'}
            helperText={repeatPasswordError}
            type='password'
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Repeat password'
          />
          <Button label='Sign up' clickHandler={onRegister} />
          <div className='user-home__auth-footer'>
            <span>Already have an account?</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              Log in
            </span>
          </div>
        </div>
      </div>
    </Fade>
  );
}

Register.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Register;
