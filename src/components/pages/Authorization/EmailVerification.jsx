import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyEmail() {
      const token = window.location.href.split('=')[1];
      if (!token) {
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/email-verify?token=${token}`,
        );
        if (res.status === 200) {
          console.log(res);
          // navigate('/login');
        }
      } catch (err) {
        console.log(err);
      }
    }
    verifyEmail();
  }, []);

  return <div>EmailVerification</div>;
}

export default EmailVerification;
