export default function ProjectHub() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Phase 4
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          🚀 Project HUB
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Your AI-generated project plan: architecture, tech stack, milestones, and timeline.
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
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          No project plan yet
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Once your research is complete, generate a full roadmap with architecture, tech stack recommendations, milestones, and a development timeline.
        </div>
      </div>
    </div>
  );
}
