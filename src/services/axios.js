import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-backend.com/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
