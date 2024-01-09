import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import GoogleButton from '@/components/pages/Authorization/GoogleButton';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Checkbox from '@/components/UI/Checkbox';

function Authorization() {
  return (
    <div className='user-home__authorization'>
      <div className='user-home__auth-left'>
        <div className='user-home__auth-left-header'>
          <div className='user-home__auth-left-logo'>
            <img src='src/assets/images/logo.png' alt='logo' />
          </div>
        </div>

        <div className='user-home__auth-left-body'>
          <h6>Welcome back! Please enter your details.</h6>
          <div className='user-home__auth-left-body-inputs'>
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

            <div className='user-home__auth-body-inputs-footer'>
              <div className='user-home__auth-remember-wrapper'>
                <Checkbox label='Remember me' />
              </div>

              <div className='user-home__auth-forgot-wrapper'>
                <a href='#'>Forgot password?</a>
              </div>
            </div>
            <Button label='Log in' />
            <p className='user-home__auth-divider'>
              <span>or</span>
            </p>
            {/* <GoogleButton /> */}
            <div className='user-home__auth-google-button'>
              <button>
                <div className='user-home__auth-google-img'></div>
                <span>Continue with google</span>
              </button>
            </div>

            <div className='user-home__auth-footer'>
              <span>Don&apos;t have an account?</span>
              <a href='#'>Sign up</a>
            </div>
          </div>
        </div>
      </div>

      <div className='user-home__auth-right'></div>
    </div>
  );
}

export default Authorization;
