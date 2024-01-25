import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
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
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Calendar from './components/Calendar';
import { ColorModeContext, useMode } from './theme';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/programs/:programId" element={<ProgramDetail />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            {/* <Route path="/confirmation" element={<ConfirmationEmail />} /> */}
          </Route>
          <Route path="/confirmation/:confirmation_token" element={<ConfirmationEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/password/:reset_password_token" element={<ResetPassword />} />
        </Routes>

      </ThemeProvider>

    </ColorModeContext.Provider>

  );
}

export default App;
