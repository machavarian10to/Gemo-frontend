import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getResetToken() {
      const token = window.location.href.split('=')[1];
      if (!token) return;

      localStorage.setItem('resetPasswordToken', token);
      navigate('/auth');
    }
    getResetToken();
  }, [navigate]);
}

export default ResetPassword;
