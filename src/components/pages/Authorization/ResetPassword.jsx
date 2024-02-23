import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    function getResetToken() {
      const token = window.location.href.split('=')[1];
      if (!token) return;

      navigate('/');
    }
    getResetToken();
  }, [navigate]);
}

export default ResetPassword;
