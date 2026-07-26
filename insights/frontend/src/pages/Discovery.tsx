export default function Discovery() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Phase 1
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          💡 Problem Discovery
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Describe your idea in a sentence. Our AI will validate it, assess feasibility, and produce a structured problem statement.
        </p>
      </div>

      {/* Idea Input Card — Placeholder */}
      <div
        className="glow-border"
        style={{
          padding: '32px',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          maxWidth: '720px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          What do you want to build?
        </div>
        <div
          style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-muted)',
            fontSize: '14px',
            minHeight: '100px',
          }}
        >
          e.g. "Build an AI solution to reduce food waste in college hostels."
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              opacity: 0.5,
            }}
            disabled
          >
            Discover →
          </button>
        </div>
      </div>
    </div>
  );
}
