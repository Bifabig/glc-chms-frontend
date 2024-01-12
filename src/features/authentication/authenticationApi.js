/* eslint-disable camelcase */
// authenticationApi.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('authToken');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token;
  }
  return config;
});

export const registerUserApi = async (data) => {
  const {
    // name,
    email, password, password_confirmation,
  } = data;
  return axiosInstance.post('/signup', {
    user: {
      // name,
      email,
      password,
      password_confirmation,
    },
  });
};

// email confirmation
export const confirmAccountApi = (token) => {
  axiosInstance.get(`/confirmation?confirmation_token=${token}`);
};

export default axiosInstance;
