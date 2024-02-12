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

// User login/logout
export const loginUserApi = async (data) => axiosInstance.post('/login', data);

export const logoutUserApi = async (authToken) => axiosInstance.delete('/logout', { headers: authToken });

// reset password
export const forgotPasswordApi = async (data) => axiosInstance.post('/password', data);
export const resetPasswordApi = async ({ password, resetPasswordToken }) => {
  axiosInstance.put(`/password?reset_password_token=${resetPasswordToken}`, password);
};

// export const fetchCurrentUserApi = async () => axiosInstance.post('/current_user');
// current user
// export const getCurrentUser = async () => axiosInstance.get('/current_user');

export default axiosInstance;
