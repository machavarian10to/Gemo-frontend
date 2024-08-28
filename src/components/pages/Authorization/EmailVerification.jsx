import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerificationDone from '@/components/animations/VerificationDone';

function EmailVerification() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState('');

  useEffect(() => {
    async function verifyEmail() {
      const token = window.location.href.split('=')[1];
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/email-verify?token=${token}`,
        );
        if (res.status === 200) {
          setVerified('Email Verified!');
        }
      } catch (err) {
        console.log(err);
        setVerified('Verification Failed');
      } finally {
        setTimeout(() => {
          navigate('/');
        }, 5000);
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
                <p>You will be redirected to the home page.</p>
                <div className='verification-dene-animation-container'>
                  <VerificationDone />
                </div>
              </>
            ) : (
              <h4>{verified}</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EmailVerification;
