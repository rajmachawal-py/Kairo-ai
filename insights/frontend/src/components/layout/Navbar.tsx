import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/discover', label: 'Discovery', icon: '💡' },
  { path: '/research', label: 'DeepSearch', icon: '🔍' },
  { path: '/workspace', label: 'Workspace', icon: '📋' },
  { path: '/hub', label: 'Project HUB', icon: '🚀' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800,
            color: 'white',
          }}
        >
          i
        </div>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}
        >
          iNSIGHTS
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent-primary-light)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.06)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* User Avatar Placeholder */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 600,
          color: 'white',
          cursor: 'pointer',
        }}
      >
        U
      </div>
    </nav>
  );
}
