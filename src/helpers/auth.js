import axiosInstance from '@/services/axios';

export const getAuthUser = () => {
  axiosInstance
    .get(`${import.meta.env.VITE_API_URL}/auth/get-user`)
    .then((res) => {
      const { user } = res.data;
      return user;
    })
    .catch((err) => {
      return null;
    });
};
