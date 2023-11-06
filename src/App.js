import { Route, Routes } from 'react-router-dom';
import Members from './components/Members';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/members" element={<Members />} />
      </Route>
    </Routes>
  );
}

export default App;
