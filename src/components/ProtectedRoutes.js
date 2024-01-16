import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import Layout from './Layout';

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  // const auth = localStorage.getItem('authToken');
  console.log(auth);
  return (
    auth.authToken !== null ? <Outlet /> : <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
