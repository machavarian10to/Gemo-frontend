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
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    emailError: '',
    usernameError: '',
    passwordError: '',
    repeatPasswordError: '',
    passwordStrength: '',
    isButtonDisabled: false,
  });

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  function isValidEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
  }

  function checkEmail() {
    if (!formState.email.trim()) {
      setFormState((prev) => ({
        ...prev,
        emailError: 'Email should not be empty!',
      }));
      return;
    }
    if (!isValidEmail()) {
      setFormState((prev) => ({ ...prev, emailError: 'Email is invalid!' }));
      return;
    }
  }

  function onEmailInput(e) {
    setFormState((prev) => ({
      ...prev,
      emailError: '',
      email: e.target.value,
    }));
  }

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
    checkPasswordStrength(e.target.value);
  }

  const checkPasswordStrength = (password) => {
    if (password.length > 6) {
      if (
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*()-_=+{}[\]:;<>,.?/\\|_]/.test(password)
      ) {
        setFormState((prev) => ({ ...prev, passwordStrength: 'Strong' }));
      } else if (/[A-Z]/.test(password) || /\d/.test(password)) {
        setFormState((prev) => ({ ...prev, passwordStrength: 'Normal' }));
      } else {
        setFormState((prev) => ({ ...prev, passwordStrength: 'Weak' }));
      }
    } else {
      setFormState((prev) => ({ ...prev, passwordStrength: 'Weak' }));
    }
  };

  function onRepeatPasswordInput(e) {
    setFormState((prev) => ({
      ...prev,
      repeatPasswordError: '',
      repeatPassword: e.target.value,
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
    if (!formState.password) {
      setFormState((prev) => ({
        ...prev,
        passwordError: 'Password should not be empty!',
        passwordStrength: '',
      }));
      return;
    }
    if (formState.password.length < 6) {
      setFormState((prev) => ({
        ...prev,
        passwordError: 'Password should be at least 6 characters long!',
        passwordStrength: '',
      }));
      return;
    }
  }

  function onRepeatPasswordBlur() {
    if (!formState.repeatPassword) {
      setFormState((prev) => ({
        ...prev,
        repeatPasswordError: 'Repeat password should not be empty!',
      }));
      return;
    }
    if (formState.repeatPassword !== formState.password) {
      setFormState((prev) => ({
        ...prev,
        repeatPasswordError: 'Passwords do not match!',
      }));
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
      formState.emailError ||
      formState.usernameError ||
      formState.passwordError ||
      formState.repeatPasswordError ||
      !formState.email.trim() ||
      !formState.username.trim() ||
      !formState.password.trim() ||
      !formState.repeatPassword.trim()
    )
      return;

    setFormState((prev) => ({
      ...prev,
      isButtonDisabled: true,
      passwordStrength: '',
    }));
    setAlertBox({ message: '', type: '' });

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email: formState.email,
        username: formState.username,
        password: formState.password,
      })
      .then((res) => {
        setFormState((prev) => ({
          ...prev,
          email: '',
          username: '',
          password: '',
          repeatPassword: '',
        }));

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
            setFormState((prev) => ({ ...prev, emailError: message }));
          }
          if (type === 'username') {
            setFormState((prev) => ({ ...prev, usernameError: message }));
          }
          if (type === 'password') {
            setFormState((prev) => ({ ...prev, passwordError: message }));
          }
          if (type === 'all') {
            setFormState((prev) => ({
              ...prev,
              emailError: message,
              usernameError: message,
              passwordError: message,
            }));
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
        setFormState((prev) => ({ ...prev, isButtonDisabled: false }));
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
            value={formState.email}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.emailError
                ? 'danger'
                : 'active'
            }
            helperText={formState.emailError}
            type='email'
            placeholder='Enter email'
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
          />
          <Input
            onInput={onUsernameInput}
            onBlur={onUsernameBlur}
            value={formState.username}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.usernameError
                ? 'danger'
                : 'active'
            }
            helperText={formState.usernameError}
            leftIcon={
              <AlternateEmailIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter username'
          />
          <Input
            onInput={onPasswordInput}
            onBlur={onPasswordBlur}
            value={formState.password}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.passwordError
                ? 'danger'
                : 'active'
            }
            helperText={formState.passwordError}
            type='password'
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter password'
          />
          <div className='user-home__auth-password-checker'>
            <div className='user-home__auth-password-progressbar'>
              <ProgressBar
                percent={100}
                color={
                  formState.passwordStrength === 'Weak'
                    ? 'var(--bg-main-red)'
                    : formState.passwordStrength === 'Normal'
                    ? 'var(--color-yellow-shade-04)'
                    : formState.passwordStrength === 'Strong'
                    ? 'var(--color-main-green)'
                    : ''
                }
              />
              <ProgressBar
                percent={100}
                color={
                  formState.passwordStrength === 'Normal'
                    ? 'var(--color-yellow-shade-04)'
                    : formState.passwordStrength === 'Strong'
                    ? 'var(--color-main-green)'
                    : ''
                }
              />
              <ProgressBar
                percent={100}
                color={
                  formState.passwordStrength === 'Strong'
                    ? 'var(--color-main-green)'
                    : ''
                }
              />
            </div>
            {formState.passwordStrength && (
              <div className='user-home__auth-password-strength'>
                <span
                  style={
                    formState.passwordStrength === 'Weak'
                      ? { color: 'var(--bg-main-red)' }
                      : formState.passwordStrength === 'Normal'
                      ? { color: 'var(--color-yellow-shade-04)' }
                      : formState.passwordStrength === 'Strong'
                      ? { color: 'var(--color-main-green)' }
                      : { color: 'var(--color-main-grey)' }
                  }
                >
                  {formState.passwordStrength}
                </span>
              </div>
            )}
          </div>
          <Input
            onInput={onRepeatPasswordInput}
            onBlur={onRepeatPasswordBlur}
            value={formState.repeatPassword}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.repeatPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={formState.repeatPasswordError}
            type='password'
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Repeat password'
          />
          <Button
            submit
            label='Sign up'
            clickHandler={onRegister}
            state={formState.isButtonDisabled ? 'inactive' : 'active'}
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
