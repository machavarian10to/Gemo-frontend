import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function ForgetPassword({ setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
            dsa
            onBlur={checkEmail}
            value={email}
            state={emailError ? 'danger' : 'active'}
            helperText={emailError}
            placeholder='Enter email'
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
          />
          <Button label='Send instructions' clickHandler={onSendInstructions} />
          <div className='user-home__auth-footer'>
            <span>Back to</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              Log in
            </span>
          </div>
        </div>
      </form>
    </Fade>
  );
}

ForgetPassword.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default ForgetPassword;
