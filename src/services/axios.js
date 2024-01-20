import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://my-backend.com/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export default axiosInstance;
