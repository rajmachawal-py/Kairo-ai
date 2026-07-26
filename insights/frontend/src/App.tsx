import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Discovery from './pages/Discovery';
import Workspace from './pages/Workspace';
import ProjectHub from './pages/ProjectHub';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Discovery />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/hub" element={<ProjectHub />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
