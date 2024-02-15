import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function EmailVerification() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

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
          user.verified = true;
        }
      } catch (err) {
        console.log(err);
      } finally {
        navigate('/');
      }
    }
    verifyEmail();
  }, [navigate, user]);
}

export default EmailVerification;
