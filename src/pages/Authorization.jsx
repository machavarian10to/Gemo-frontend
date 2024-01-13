import { useState } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import GoogleButton from '@/components/pages/Authorization/GoogleButton';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Checkbox from '@/components/UI/Checkbox';
import { Fade } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ProgressBar from '@/components/UI/ProgressBar';

function Authorization() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='user-home__authorization'>
      <div className='user-home__auth-left'>
        <div className='user-home__auth-left-header'>
          <div className='user-home__auth-left-logo'>
            <img src='src/assets/images/logo.png' alt='logo' />
          </div>
        </div>

        <div className='user-home__auth-left-body'>
          <Fade in={true} timeout={1000}>
            {showLogin ? (
              <div>
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
                  <div className='user-home__auth-password-input-wrapper'>
                    <Input
                      leftIcon={
                        <VpnKeyOutlinedIcon
                          style={{
                            color: 'var(--color-grey)',
                            fontSize: '18px',
                          }}
                        />
                      }
                      placeholder='Enter password'
                    />

                    <div className='user-home__auth-password-eye'>
                      {/* <RemoveRedEyeOutlinedIcon
                      style={{ color: 'var(--color-grey)', fontSize: '18px' }}
                    /> */}
                      <VisibilityOffOutlinedIcon
                        style={{ color: 'var(--color-grey)', fontSize: '18px' }}
                      />
                    </div>
                  </div>

                  <div className='user-home__auth-body-inputs-footer'>
                    <div className='user-home__auth-remember-wrapper'>
                      <Checkbox label='Remember me' />
                    </div>

                    <div className='user-home__auth-forgot-wrapper'>
                      <span className='link'>Forgot password?</span>
                    </div>
                  </div>
                  <Button label='Log in' />
                  <p className='user-home__auth-divider'>
                    <span>or</span>
                  </p>
                  <GoogleButton />
                  {/* <div className='user-home__auth-google-button'>
                  <button>
                    <div className='user-home__auth-google-img'></div>
                    <span>Continue with google</span>
                  </button>
                </div> */}

                  <div className='user-home__auth-footer'>
                    <span>Don&apos;t have an account?</span>
                    <span
                      className='link'
                      onClick={() => setShowLogin((prev) => !prev)}
                    >
                      Sign up
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // <Fade in={!showLogin} timeout={800}>
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
                  {/* <div>
                  <FiberManualRecordIcon
                    style={{
                      color: 'var(--color-green-shade-01)',
                      fontSize: '10px',
                    }}
                  />
                  <span> min 8 characters</span>
                </div> */}
                  <div className='user-home__auth-password-checker'>
                    <div className='user-home__auth-password-progressbar'>
                      <ProgressBar percent='100' />
                      <ProgressBar percent='100' />
                      <ProgressBar percent='100' />
                    </div>
                    {/* <div className='user-home__auth-password-strength'>weak</div> */}
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
                    <span
                      className='link'
                      onClick={() => setShowLogin((prev) => !prev)}
                    >
                      Log in
                    </span>
                  </div>
                </div>
              </div>
              // </Fade>
            )}
          </Fade>
        </div>
      </div>

      <div className='user-home__auth-right'></div>
    </div>
  );
}

export default Authorization;
