import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@mui/material';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function ForgetPassword({ setCurrentTab }) {
  return (
    <Fade in={true} timeout={1000}>
      <div>
        <h6>Forgot password?</h6>
        <h5>
          Enter the email and we’ll send an email with instructions to reset
          your password
        </h5>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter email'
          />
          <Button label='Send instructions' />
          <div className='user-home__auth-footer'>
            <span>Back to</span>
            <span className='link' onClick={() => setCurrentTab('login')}>
              Log in
            </span>
          </div>
        </div>
      </div>
    </Fade>
  );
}

ForgetPassword.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default ForgetPassword;
