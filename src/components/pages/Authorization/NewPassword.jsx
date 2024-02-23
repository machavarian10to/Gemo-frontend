import { useState } from 'react';
import PropTypes from 'prop-types';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import AlertBox from '@/components/UI/AlertBox';
import axios from 'axios';
import { useSelector } from 'react-redux';

function NewPassword({ setCurrentTab }) {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const user = useSelector((state) => state.auth);

  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  function onNewPasswordBlur() {
    if (!newPassword) {
      setNewPasswordError('Password should not be empty!');
      return;
    }
    if (newPassword.length < 6) {
      setNewPasswordError('Password should be at least 6 characters long!');
      return;
    }
  }

  function onRepeatPasswordBlur() {
    if (!confirmPassword) {
      setConfirmPasswordError('Repeat password should not be empty!');
      return;
    }
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match!');
      return;
    }
  }

  function onNewPasswordInput(e) {
    setNewPasswordError('');
    setNewPassword(e.target.value);
  }

  function onConfirmPasswordInput(e) {
    setConfirmPasswordError('');
    setConfirmPassword(e.target.value);
  }

  function ResetPassword(e) {
    e.preventDefault();
    onNewPasswordBlur();
    onRepeatPasswordBlur();

    if (newPasswordError || confirmPasswordError) return;

    setIsButtonDisabled(true);
    setAlert({ message: '', type: '' });

    if (!token) {
      setAlert({
        message: 'Invalid reset password token!',
        type: 'error',
      });
      setIsButtonDisabled(false);
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token,
        password: newPassword,
      })
      .then((res) => {
        setAlert({
          message: res.data.message,
          type: 'success',
        });
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setCurrentTab('login');
        }, 2000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data.message,
          type: 'error',
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={ResetPassword}>
        <h6>Reset password</h6>
        <h5>
          Enter new password and confirm it to reset your password and log in
        </h5>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            type='password'
            onInput={onNewPasswordInput}
            onBlur={onNewPasswordBlur}
            value={newPassword}
            state={
              isButtonDisabled
                ? 'inactive'
                : newPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={newPasswordError}
            placeholder='New password'
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
            value={confirmPassword}
            state={
              isButtonDisabled
                ? 'inactive'
                : confirmPasswordError
                ? 'danger'
                : 'active'
            }
            helperText={confirmPasswordError}
            placeholder='Repeat password'
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
            label='Reset password'
            clickHandler={ResetPassword}
            state={isButtonDisabled ? 'inactive' : 'active'}
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
