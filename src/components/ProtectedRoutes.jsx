import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import Layout from './Layout';

const ProtectedRoutes = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const auth = localStorage.getItem('authToken');
  // console.log(status, authToken);
  // console.log(status, authToken);
  return isLoading ? <h2>Loading...</h2> : (
    <div>
      {auth && auth.length > 0 ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default ProtectedRoutes;
