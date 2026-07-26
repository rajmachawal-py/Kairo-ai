export default function Dashboard() {
  const stats = [
    { label: 'Projects', value: '0', icon: '📁', color: 'var(--accent-primary)' },
    { label: 'Sources Found', value: '0', icon: '🔗', color: 'var(--accent-secondary)' },
    { label: 'Clusters', value: '0', icon: '🧩', color: 'var(--accent-success)' },
    { label: 'Resources', value: '0', icon: '📦', color: 'var(--accent-warning)' },
  ];

  const pipelineSteps = [
    { label: 'Discovery', status: 'pending' },
    { label: 'DeepSearch', status: 'pending' },
    { label: 'Clustering', status: 'pending' },
    { label: 'Roadmap', status: 'pending' },
    { label: 'Resources', status: 'pending' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Overview
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          📊 Dashboard
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px' }}>
          A bird's-eye view of your project lifecycle — from idea to implementation.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glow-border"
            style={{
              padding: '20px',
              borderRadius: '14px',
              background: 'var(--bg-card)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Progress */}
      <div
        className="glow-border"
        style={{
          padding: '24px',
          borderRadius: '14px',
          background: 'var(--bg-card)',
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
          Project Pipeline
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {pipelineSteps.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    border: '2px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  {step.label}
                </div>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div
                  style={{
                    height: '2px',
                    flex: 1,
                    background: 'var(--border-primary)',
                    marginBottom: '20px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
