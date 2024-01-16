import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { loginUserAsync, logoutUserAsync } from '../features/authentication/authenticationSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { authToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    // name: '',
    email: '',
    password: '',
    // passwordConfirmation: '',
    // type: '',
  });

  const handleLogout = () => {
    dispatch(logoutUserAsync(formData));
    localStorage.removeItem('authToken');
    // navigates('/signup');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch(loginUserAsync(formData));
    navigates('/');
  };

  return (
    <div>
      {authToken !== null
        ? (
          <Button
            onClick={handleLogout}
            variant="contained"
        // className={styles.updateBtn}
            size="small"
          >
            Logout
          </Button>
        )
        : (
          <form
            onSubmit={handleSubmitForm}
          >
            <h3>Login</h3>
            <div>
              {/* <input
            placeholder="John Doe"
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          /> */}
              <input
                placeholder="johndoe@example.com"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              {/* <input
            required
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            placeholder="Confirm password"
          /> */}
            </div>
            <button type="submit">
              Login
            </button>
          </form>
        )}
    </div>
  );
};

export default Login;
