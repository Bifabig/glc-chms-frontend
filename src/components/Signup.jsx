import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserAsync } from '../features/authentication/authenticationSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigates = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    type: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch(registerUserAsync(formData));
    navigates('/members');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmitForm}
      >
        <h3>REGISTER</h3>
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
          <input
            required
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            placeholder="Confirm password"
          />
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
