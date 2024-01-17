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

export const registerUserApi = async (user) => axiosInstance.post('/signup', user);

// email confirmation
export const confirmAccountApi = async (token) => {
  axiosInstance.get(`/confirmation?confirmation_token=${token}`);
};

export const loginUserApi = async (data) => axiosInstance.post('/login', data);
// const {
// name,
// email, password,
// } = data;
// return axiosInstance.post('/login', {
// user: {
// name,
// email,
// password,
// password_confirmation,
// },
// });
export const logoutUserApi = async (authToken) =>
  // const {
// name,
// email, password,
  // } = data;
  // eslint-disable-next-line implicit-arrow-linebreak
  axiosInstance.delete('/logout', { headers: authToken });
// , {
// user: {
// name,
// email,
// password,
// password_confirmation,
// },
// );

export default axiosInstance;
