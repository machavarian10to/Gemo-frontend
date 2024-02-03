import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
          `${
            import.meta.env.VITE_API_URL
          }/api/auth/email-verify?token=${token}`,
        );
        if (res.status === 200) {
          localStorage.setItem('emailVerified', 'true');
        }
      } catch (err) {
        console.log(err);
      } finally {
        navigate('/auth');
      }
    }
    verifyEmail();
  }, [navigate]);
}

export default EmailVerification;
