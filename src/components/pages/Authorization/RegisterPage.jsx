import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/UI/Input';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ProgressBar from '@/components/UI/ProgressBar';
import Button from '@/components/UI/Button';
import { Fade } from '@mui/material';
import axios from 'axios';
import AlertBox from '@/components/UI/AlertBox';

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

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
    checkPasswordStrength(e.target.value);
  }

  const checkPasswordStrength = (password) => {
    if (password.length > 6) {
      if (
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*()-_=+{}[\]:;<>,.?/\\|_]/.test(password)
      ) {
        setPasswordStrength('Strong');
      } else if (/[A-Z]/.test(password) || /\d/.test(password)) {
        setPasswordStrength('Normal');
      } else {
        setPasswordStrength('Weak');
      }
    } else {
      setPasswordStrength('Weak');
    }
  };

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
      return;
    }
    // if (password.length < 6) {
    //   setPasswordError('Password should be at least 6 characters long!');
    //   setPasswordStrength('');
    //   return;
    // }
  }

  function onRepeatPasswordBlur() {
    if (!repeatPassword) {
      setRepeatPasswordError('Repeat password should not be empty!');
      return;
    }
    if (repeatPassword !== password) {
      setRepeatPasswordError('Passwords do not match!');
      return;
    }
  }

  function onRegister(e) {
    e.preventDefault();

    checkEmail();
    onUsernameBlur();
    onPasswordBlur();
    onRepeatPasswordBlur();

    if (
      emailError ||
      usernameError ||
      passwordError ||
      repeatPasswordError ||
      !email ||
      !username ||
      !password ||
      !repeatPassword
    )
      return;

    setIsButtonDisabled(true);
    setPasswordStrength('');
    setAlertBox({ message: '', type: '' });

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        email,
        username,
        password,
      })
      .then((res) => {
        setEmail('');
        setUsername('');
        setPassword('');
        setRepeatPassword('');

        if (res.statusText === 'OK') {
          setAlertBox({
            message: 'Account created successfully! Please verify your email.',
            type: 'success',
          });
          setTimeout(() => {
            setCurrentTab('login');
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response) {
          const { message, type } = err.response.data;
          if (type === 'email') {
            setEmailError(message);
          }
          if (type === 'username') {
            setUsernameError(message);
          }
          // if (type === 'password') {
          //   setPasswordError(message);
          // }
          if (type === 'all') {
            setEmailError(message);
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
      <form onSubmit={onRegister}>
        <h6>Create an account, Start your culinary journey!</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            onInput={onEmailInput}
            onBlur={checkEmail}
            value={email}
            state={
              isButtonDisabled ? 'inactive' : emailError ? 'danger' : 'active'
            }
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
            state={
              isButtonDisabled
                ? 'inactive'
                : usernameError
                ? 'danger'
                : 'active'
            }
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
            state={
              isButtonDisabled
                ? 'inactive'
                : passwordError
                ? 'danger'
                : 'active'
            }
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
                    ? 'var(--color-main-green)'
                    : ''
                }
              />
              <ProgressBar
                percent='100'
                color={
                  passwordStrength === 'Normal'
                    ? 'var(--color-yellow-shade-04)'
                    : passwordStrength === 'Strong'
                    ? 'var(--color-main-green)'
                    : ''
                }
              />
              <ProgressBar
                percent='100'
                color={
                  passwordStrength === 'Strong' ? 'var(--color-main-green)' : ''
                }
              />
            </div>
            {passwordStrength && (
              <div className='user-home__auth-password-strength'>
                <span
                  style={
                    passwordStrength === 'Weak'
                      ? { color: 'var(--bg-main-red)' }
                      : passwordStrength === 'Normal'
                      ? { color: 'var(--color-yellow-shade-04)' }
                      : passwordStrength === 'Strong'
                      ? { color: 'var(--color-main-green)' }
                      : { color: 'var(--color-grey)' }
                  }
                >
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>
          <Input
            onInput={onRepeatPasswordInput}
            onBlur={onRepeatPasswordBlur}
            value={repeatPassword}
            state={
              isButtonDisabled
                ? 'inactive'
                : repeatPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={repeatPasswordError}
            type='password'
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Repeat password'
          />
          <Button
            submit
            label='Sign up'
            clickHandler={onRegister}
            state={isButtonDisabled ? 'inactive' : 'active'}
          />
          <div className='user-home__auth-footer'>
            <span>Already have an account?</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              Log in
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

Register.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Register;
