import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState('');

  useEffect(() => {
    async function verifyEmail() {
      const token = window.location.href.split('=')[1];
      if (!token) return;

      try {
        // const res = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/auth/email-verify?token=${token}`,
        // );
        // if (res.status === 200) {
        setVerified('Successful');
        // }
      } catch (err) {
        console.log(err);
        setVerified('Failed');
      } finally {
        // navigate('/');
      }
    }
    verifyEmail();
  }, [navigate]);

  return (
    <>
      {verified && (
        <div className='email-verification-wrapper'>
          <div className='email-verification-container'>
            <h4 className={`verify-state-${verified}`}>
              Email verification is {verified}!
            </h4>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailVerification;
