import axiosInstance from '@/services/axios';

const setToken = (name, value) => {
  document.cookie = `${name}=${value}; Secure; SameSite=Strict; Path=/`;
};

const getToken = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/api/users/user');
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const logout = async () => {
  document.cookie = `accessToken=; Secure; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const authService = {
  setToken,
  getToken,
  getCurrentUser,
  logout,
};

export default authService;
