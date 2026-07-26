import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { path: '/discover', label: 'Discovery', icon: '💡', description: 'Validate your idea' },
  { path: '/research', label: 'DeepSearch', icon: '🔍', description: 'Multi-source research' },
  { path: '/workspace', label: 'Workspace', icon: '📋', description: 'Notes & clusters' },
  { path: '/hub', label: 'Project HUB', icon: '🚀', description: 'Roadmap & planning' },
  { path: '/resources', label: 'Resources', icon: '📦', description: 'Repos, papers, APIs' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊', description: 'Overview & stats' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const width = collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  return (
    <aside
      style={{
        width,
        minWidth: width,
        height: 'calc(100vh - var(--navbar-height))',
        position: 'fixed',
        top: 'var(--navbar-height)',
        left: 0,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 12px',
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflowX: 'hidden',
        zIndex: 40,
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          alignSelf: collapsed ? 'center' : 'flex-end',
          background: 'transparent',
          border: '1px solid var(--border-primary)',
          borderRadius: '6px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px 8px',
          fontSize: '14px',
          marginBottom: '16px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Menu Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '10px' : '10px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? 'var(--accent-primary-light)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
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
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom section */}
      {!collapsed && (
        <div
          style={{
            padding: '14px',
            borderRadius: '10px',
            background: 'var(--gradient-glow)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            🧠 AI Copilot
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            From idea to implementation-ready project in minutes.
          </div>
        </div>
      )}
    </aside>
  );
}
