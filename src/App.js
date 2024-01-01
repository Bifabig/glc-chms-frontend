import { Route, Routes } from 'react-router-dom';
import Members from './components/Members';
import Layout from './components/Layout';
import Churches from './components/Churches';
import Teams from './components/Teams';
import Programs from './components/Programs';
import MemberDetail from './components/Members/MemberDetail';
import ChurchDetail from './components/Churches/ChurchDetail';
import TeamDetail from './components/Teams/TeamDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberId" element={<MemberDetail />} />
        <Route path="/churches" element={<Churches />} />
        <Route path="/churches/:churchId" element={<ChurchDetail />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamDetail />} />
        <Route path="/programs" element={<Programs />} />
      </Route>
    </Routes>
  );
}

export default App;
