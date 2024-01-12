import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { confirmAccountAsync } from '../features/authentication/authenticationSlice';

const ConfirmationEmail = () => {
  const message = useSelector((state) => state.auth.message);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(message);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const confirmationToken = searchParams.get('confirmation_token');
    dispatch(confirmAccountAsync(confirmationToken));
  }, [location.search, dispatch]);

  return (
    <>
      <section>
        <div>
          <Link to="/login">
            Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default ConfirmationEmail;
