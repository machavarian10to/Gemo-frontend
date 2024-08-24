import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/state/index';
import AlertBox from '@/components/UI/AlertBox';
import authService from '@/services/authService';
import axios from 'axios';

function GoogleCallback() {
  const dispatch = useDispatch();

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  const url = new URL(window.location.href);
  const userId = url.searchParams.get('userId');
  const token = url.searchParams.get('token');

  if (!token) {
    window.location.href = '/';
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/get-user/${userId}`)
      .then((res) => {
        const user = res.data;
        authService.setToken('accessToken', token);
        dispatch(setLogin({ user, token }));
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        setAlertBox({
          message: 'Something went wrong! Please try again later.',
          type: 'error',
        });
      });
  }, [dispatch, token, userId]);

  return (
    <>
      {alertBox.message && (
        <AlertBox message={alertBox.message} type={alertBox.type} />
      )}
    </>
  );
}

export default GoogleCallback;
