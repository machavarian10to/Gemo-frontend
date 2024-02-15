import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ResetPassword() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    function getResetToken() {
      const token = window.location.href.split('=')[1];
      if (!token) return;

      user.resetPasswordToken = token;
      navigate('/');
    }
    getResetToken();
  }, [navigate, user]);
}

export default ResetPassword;
