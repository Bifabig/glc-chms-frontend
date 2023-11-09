import { Route, Routes } from 'react-router-dom';
import Members from './components/Members/Members';
import Layout from './components/Layout';
import Churches from './components/Churches/Churches';
import Teams from './components/Teams/Teams';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/members" element={<Members />} />
        <Route path="/churches" element={<Churches />} />
        <Route path="/teams" element={<Teams />} />
      </Route>
    </Routes>
  );
}

export default App;
