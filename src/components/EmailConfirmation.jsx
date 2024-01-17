import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { confirmAccountAsync } from '../features/authentication/authenticationSlice';

const ConfirmationEmail = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const confirmationToken = searchParams.get('confirmation_token');
    dispatch(confirmAccountAsync(confirmationToken));
  }, [location.search, dispatch]);

  return isLoading ? <h2>Loading...</h2> : (
    <Navigate to="/login" />
  );
};

export default ConfirmationEmail;
