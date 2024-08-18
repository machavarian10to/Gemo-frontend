import axiosInstance from '@/services/axios';

const setToken = (name, value) => {
  document.cookie = `${name}=${value}; HttpOnly; Secure`;
};

const getToken = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/get-user');
    return response.data;
  } catch (error) {
    console.log(error);
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
  getCurrentUser,
  logout,
};

export default authService;
