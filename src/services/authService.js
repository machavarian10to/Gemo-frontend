import axios from 'axios';

const setToken = (name, value) => {
  document.cookie = `${name}=${value}; HttpOnly; Secure`;
};

const getToken = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const renewAccessToken = async () => {
  const refreshToken = getToken('refreshToken');
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    { refreshToken },
  );
  setToken('accessToken', response.data.accessToken);
  setToken('refreshToken', response.data.refreshToken);
};

const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/get-user`,
      {
        headers: {
          Authorization: `Bearer ${getToken('accessToken')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    await renewAccessToken();
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/get-user`,
      {
        headers: {
          Authorization: `Bearer ${getToken('accessToken')}`,
        },
      },
    );
    return response.data;
  }
};

const logout = async () => {
  document.cookie = `accessToken=; HttpOnly; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `refreshToken=; HttpOnly; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  window.location.href = '/';
};

const authService = {
  setToken,
  getToken,
  renewAccessToken,
  getCurrentUser,
  logout,
};

export default authService;
