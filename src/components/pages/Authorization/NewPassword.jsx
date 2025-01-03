import { useState } from 'react';
import PropTypes from 'prop-types';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import AlertBox from '@/components/UI/AlertBox';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setResetToken } from '@/state/index';
import { useTranslation } from 'react-i18next';

function NewPassword({ setCurrentTab }) {
  const [formState, setFormState] = useState({
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    isButtonDisabled: false,
  });

  const [alert, setAlert] = useState({ message: '', type: '' });

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const resetPasswordToken = useSelector((state) => state.resetToken);

  function onNewPasswordBlur() {
    if (!formState.newPassword.trim()) {
      setFormState((prev) => ({
        ...prev,
        newPasswordError: t('authorization.empty_password'),
      }));
      return;
    }
    if (formState.newPassword.length < 6) {
      setFormState((prev) => ({
        ...prev,
        newPasswordError: t('authorization.min_password_length'),
      }));
      return;
    }
  }

  function onRepeatPasswordBlur() {
    if (!formState.confirmPassword.trim()) {
      setFormState((prev) => ({
        ...prev,
        confirmPasswordError: t('authorization.empty_repeat_password'),
      }));
      return;
    }
    if (formState.confirmPassword !== formState.newPassword) {
      setFormState((prev) => ({
        ...prev,
        confirmPasswordError: t('authorization.passwords_not_match'),
      }));
      return;
    }
  }

  function onNewPasswordInput(e) {
    setFormState((prev) => ({
      ...prev,
      newPasswordError: '',
      newPassword: e.target.value,
    }));
  }

  function onConfirmPasswordInput(e) {
    setFormState((prev) => ({
      ...prev,
      confirmPasswordError: '',
      confirmPassword: e.target.value,
    }));
  }

  function ResetPassword(e) {
    e.preventDefault();
    onNewPasswordBlur();
    onRepeatPasswordBlur();

    if (formState.newPasswordError || formState.confirmPasswordError) return;

    setFormState((prev) => ({ ...prev, isButtonDisabled: true }));
    setAlert({ message: '', type: '' });

    if (!resetPasswordToken) {
      setAlert({
        message: t('authorization.invalid_reset_token'),
        type: 'error',
      });
      setFormState((prev) => ({ ...prev, isButtonDisabled: false }));
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token: resetPasswordToken,
        password: formState.newPassword,
      })
      .then((res) => {
        setAlert({ message: res.data.message, type: 'success' });
        setTimeout(() => setCurrentTab('login'), 2000);
        setFormState((prev) => ({
          ...prev,
          newPassword: '',
          confirmPassword: '',
        }));
        dispatch(setResetToken(''));
      })
      .catch((error) => {
        setAlert({ message: error.response.data.message, type: 'error' });
      })
      .finally(() => {
        setFormState((prev) => ({ ...prev, isButtonDisabled: false }));
      });
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={ResetPassword}>
        <h6>{t('authorization.reset_password')}</h6>
        <h5>{t('authorization.enter_new_password')}</h5>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            type='password'
            onInput={onNewPasswordInput}
            onBlur={onNewPasswordBlur}
            value={formState.newPassword}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.newPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={formState.newPasswordError}
            placeholder={t('authorization.new_password')}
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{
                  color: 'var(--color-grey)',
                  fontSize: '18px',
                }}
              />
            }
          />
          <Input
            type='password'
            onInput={onConfirmPasswordInput}
            onBlur={onRepeatPasswordBlur}
            value={formState.confirmPassword}
            state={
              formState.isButtonDisabled
                ? 'inactive'
                : formState.confirmPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={formState.confirmPasswordError}
            placeholder={t('authorization.repeat_password')}
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{
                  color: 'var(--color-grey)',
                  fontSize: '18px',
                }}
              />
            }
          />
          <Button
            submit
            label={t('authorization.reset_password')}
            clickHandler={ResetPassword}
            state={formState.isButtonDisabled ? 'inactive' : 'active'}
          />
        </div>
        {alert.message && (
          <AlertBox message={alert.message} type={alert.type} />
        )}
      </form>
    </Fade>
  );
}

NewPassword.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default NewPassword;
