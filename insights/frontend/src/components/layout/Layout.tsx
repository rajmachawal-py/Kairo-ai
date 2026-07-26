import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ display: 'flex', paddingTop: 'var(--navbar-height)' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            marginLeft: 'var(--sidebar-width)',
            padding: '32px',
            minHeight: 'calc(100vh - var(--navbar-height))',
            transition: 'margin-left 0.25s ease',
          }}
        >
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
