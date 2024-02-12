import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/state/index';
import AlertBox from '@/components/UI/AlertBox';
import axios from 'axios';

function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  const url = new URL(window.location.href);
  const userId = url.searchParams.get('userId');
  const token = url.searchParams.get('token');

  if (!userId || !token) {
    navigate('/');
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/user?id=${userId}`)
      .then((res) => {
        const { user } = res.data;
        localStorage.setItem('token', token);
        dispatch(setLogin({ user, token }));
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setAlertBox({
          message: 'Something went wrong! Please try again later.',
          type: 'error',
        });
      });
  }, [dispatch, navigate, token, userId]);

  return (
    <>
      {alertBox.message && (
        <AlertBox message={alertBox.message} type={alertBox.type} />
      )}
    </>
  );
}

export default GoogleCallback;
