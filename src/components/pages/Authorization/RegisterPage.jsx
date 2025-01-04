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
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  function isValidEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
  }

  function checkEmail() {
    if (!formState.email.trim()) {
      setFormState((prev) => ({
        ...prev,
        emailError: t('authorization.empty_email'),
      }));
      return;
    }
    if (!isValidEmail()) {
      setFormState((prev) => ({
        ...prev,
        emailError: t('authorization.invalid_email'),
      }));
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
        usernameError: t('authorization.empty_username'),
      }));
    }
  }

  function onPasswordBlur() {
    if (!formState.password) {
      setFormState((prev) => ({
        ...prev,
        passwordError: t('authorization.empty_password'),
        passwordStrength: '',
      }));
      return;
    }
    if (formState.password.length < 6) {
      setFormState((prev) => ({
        ...prev,
        passwordError: t('authorization.min_password_length'),
        passwordStrength: '',
      }));
      return;
    }
  }

  function onRepeatPasswordBlur() {
    if (!formState.repeatPassword) {
      setFormState((prev) => ({
        ...prev,
        repeatPasswordError: t('authorization.empty_repeat_password'),
      }));
      return;
    }
    if (formState.repeatPassword !== formState.password) {
      setFormState((prev) => ({
        ...prev,
        repeatPasswordError: t('authorization.passwords_not_match'),
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
            message: t('authorization.register_success'),
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
            message: t('network_error'),
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
        <h6>{t('authorization.create_account')}</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            label={t('authorization.email')}
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
            placeholder={t('authorization.enter_email')}
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-main-grey)', fontSize: '18px' }}
              />
            }
          />
          <Input
            label={t('authorization.username')}
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
            placeholder={t('authorization.username_placeholder')}
          />
          <Input
            label={t('authorization.password')}
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
            placeholder={t('authorization.password_placeholder')}
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
            label={t('authorization.repeat_password')}
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
            placeholder={t('authorization.repeat_password')}
          />
          <Button
            submit
            label='Sign up'
            clickHandler={onRegister}
            state={formState.isButtonDisabled ? 'inactive' : 'active'}
          />
          <div className='user-home__auth-footer'>
            <span>{t('authorization.already_have_account')}</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              {t('authorization.login')}
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
