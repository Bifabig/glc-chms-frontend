import { Route, Routes } from 'react-router-dom';
import Members from './components/Members';
import Layout from './components/Layout';
import Churches from './components/Churches';
import Teams from './components/Teams';
import Programs from './components/Programs';
import MemberDetail from './components/Members/MemberDetail';
import ChurchDetail from './components/Churches/ChurchDetail';
import TeamDetail from './components/Teams/TeamDetail';
import ProgramDetail from './components/Programs/ProgramDetail';
import Signup from './components/Signup';
import ConfirmationEmail from './components/EmailConfirmation';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="/members" element={<Members />} />
          <Route path="/members/:memberId" element={<MemberDetail />} />
          <Route path="/churches" element={<Churches />} />
          <Route path="/churches/:churchId" element={<ChurchDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:programId" element={<ProgramDetail />} />
        </Route>
        {/* <Route path="/confirmation" element={<ConfirmationEmail />} /> */}
      </Route>
      <Route path="/confirmation/:confirmation_token" element={<ConfirmationEmail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
