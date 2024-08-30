import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResetToken } from '@/state/index';

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    function getResetToken() {
      const token = window.location.href.split('=')[1];
      if (!token) return navigate('/');
      dispatch(setResetToken(token));
      navigate('/');
    }
    getResetToken();
  }, [navigate, dispatch]);
}

export default ResetPassword;
