import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/state/index';
import AlertBox from '@/components/UI/AlertBox';
import axiosInstance from '@/services/axios';
import authService from '@/services/authService';

function GoogleCallback() {
  const dispatch = useDispatch();

  const [alertBox, setAlertBox] = useState({ message: '', type: '' });

  const url = new URL(window.location.href);
  const userId = url.searchParams.get('userId');
  const token = url.searchParams.get('token');
  const refreshToken = url.searchParams.get('refreshToken');

  if (!token) {
    window.location.replace('/');
  }

  authService.setToken('accessToken', token);
  authService.setToken('refreshToken', refreshToken);

  useEffect(() => {
    axiosInstance
      .get('/api/users/get-user')
      .then((res) => {
        const { user } = res.data;
        dispatch(setLogin({ user, token }));
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
        setAlertBox({
          message: 'Something went wrong! Please try again later.',
          type: 'error',
        });
      });
  }, [dispatch, refreshToken, token, userId]);

  return (
    <>
      {alertBox.message && (
        <AlertBox message={alertBox.message} type={alertBox.type} />
      )}
    </>
  );
}

export default GoogleCallback;
