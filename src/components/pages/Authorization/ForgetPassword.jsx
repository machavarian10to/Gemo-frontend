import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from 'axios';
import AlertBox from '@/components/UI/AlertBox';

function ForgetPassword({ setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

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

  function onSendInstructions(e) {
    e.preventDefault();
    checkEmail();

    if (emailError) return;

    setIsButtonDisabled(true);

    try {
      const res = axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forget-password`,
        {
          email,
        },
      );

      if (res.status === 200) {
        console.log('Email sent successfully');
        setAlert({
          message: 'Email sent successfully!',
          type: 'success',
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
      setAlert({
        message: error.response.data.message,
        type: 'error',
      });
    } finally {
      setIsButtonDisabled(false);
    }
  }

  function onEmailInput(e) {
    setEmailError('');
    setEmail(e.target.value);
  }

  return (
    <Fade in={true} timeout={1000}>
      <form onSubmit={onSendInstructions}>
        <h6>Forgot password?</h6>
        <h5>
          Enter the email and we’ll send an email with instructions to reset
          your password
        </h5>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            onInput={onEmailInput}
            onBlur={checkEmail}
            value={email}
            state={
              isButtonDisabled ? 'inactive' : emailError ? 'danger' : 'active'
            }
            helperText={emailError}
            placeholder='Enter email'
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
          />
          <Button
            submit
            label='Send instructions'
            clickHandler={onSendInstructions}
            state={isButtonDisabled ? 'inactive' : 'active'}
          />
          <div className='user-home__auth-footer'>
            <span>Back to</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              Log in
            </span>
          </div>
        </div>
        {alert.message && (
          <AlertBox message={alert.message} type={alert.type} />
        )}
      </form>
    </Fade>
  );
}

ForgetPassword.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default ForgetPassword;
