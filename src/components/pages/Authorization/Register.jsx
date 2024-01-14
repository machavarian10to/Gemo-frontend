import PropTypes from 'prop-types';
import Input from '@/components/UI/Input';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ProgressBar from '@/components/UI/ProgressBar';
import Button from '@/components/UI/Button';
import { Fade } from '@mui/material';

function Register({ setCurrentTab }) {
  return (
    <Fade in={true} timeout={1000}>
      <div>
        <h6>Create an account, Start your journey!</h6>
        <div className='user-home__auth-left-body-inputs'>
          <Input
            leftIcon={
              <EmailOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter email'
          />
          <Input
            leftIcon={
              <AlternateEmailIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter username'
          />
          <Input
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Enter password'
          />
          <div className='user-home__auth-password-checker'>
            <div className='user-home__auth-password-progressbar'>
              <ProgressBar percent='100' />
              <ProgressBar percent='100' />
              <ProgressBar percent='100' />
            </div>
            {/* <div className='user-home__auth-password-strength'>
        weak
      </div> */}
          </div>
          <Input
            leftIcon={
              <VpnKeyOutlinedIcon
                style={{ color: 'var(--color-grey)', fontSize: '18px' }}
              />
            }
            placeholder='Repeat password'
          />
          <Button label='Sign up' />
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
