import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimationVerificationDone from '@/components/animations/AnimationVerificationDone';
import Button from '@/components/UI/Button';

function EmailVerification() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState('');

  useEffect(() => {
    async function verifyEmail() {
      const token = window.location.href.split('=')[1];
      if (!token) return navigate('/');

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/email-verify?token=${token}`,
        );
        if (res.status === 200) {
          setVerified('Email Verified!');
        }
      } catch (err) {
        console.log(err);
        setVerified({
          text: 'Email verification failed!',
          error: err.response.data.message,
        });
      }
    }
    verifyEmail();
  }, [navigate]);

  return (
    <>
      {verified && (
        <div className='email-verification-wrapper'>
          <div className='email-verification-container'>
            {verified === 'Email Verified!' ? (
              <>
                <h4>{verified}</h4>
                <p>Your email address was successfully verified!</p>
                <div className='verification-dene-animation-container-wrapper'>
                  <AnimationVerificationDone />
                </div>
                <div className='email-verification-redirect-button'>
                  <Button
                    type='base'
                    label='Return to login page'
                    clickHandler={() => navigate('/')}
                  />
                </div>
              </>
            ) : (
              <>
                <h4>{verified.text}</h4>
                <p>{verified.error}</p>
                <div className='email-verification-redirect-button'>
                  <Button
                    type='base'
                    label='Return to login page'
                    clickHandler={() => navigate('/')}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EmailVerification;
