export default function Workspace() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Phase 3
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          📋 Research Workspace
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Your clustered research, notes, and innovation opportunities — all in one place.
        </p>
      </div>

      {/* Empty State */}
      <div
        className="glow-border"
        style={{
          padding: '48px',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          textAlign: 'center',
          maxWidth: '560px',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          No workspace yet
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Complete Problem Discovery and DeepSearch first. Your research will be automatically organized into clusters here.
        </div>
      </div>
    </div>
  );
}
