import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Discovery from './pages/Discovery';
import Workspace from './pages/Workspace';
import ProjectHub from './pages/ProjectHub';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page — no sidebar/navbar */}
        <Route path="/" element={<Landing />} />

        {/* App pages — with Layout shell */}
        <Route element={<Layout />}>
          <Route path="/discover" element={<Discovery />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/hub" element={<ProjectHub />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
