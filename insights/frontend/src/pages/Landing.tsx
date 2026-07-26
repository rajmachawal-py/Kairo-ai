import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent 70%)',
          bottom: '-50px',
          left: '-50px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="animate-fade-in"
        style={{
          textAlign: 'center',
          maxWidth: '720px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            fontSize: '13px',
            color: 'var(--accent-primary-light)',
            fontWeight: 500,
            marginBottom: '28px',
          }}
        >
          ✨ iNSIGHTS Layer 2 — Hackathon Edition
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '20px',
          }}
        >
          Search Less.{' '}
          <span className="gradient-text">Solve More.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Your AI-powered Research & Innovation Copilot. Go from a one-line idea
          to an implementation-ready project plan — in minutes, not hours.
        </p>

        {/* CTA */}
        <Link
          to="/discover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            borderRadius: '12px',
            background: 'var(--gradient-primary)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
          }}
        >
          Start Discovering →
        </Link>

        {/* Feature pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '56px',
          }}
        >
          {[
            '💡 Problem Discovery',
            '🔍 DeepSearch',
            '📋 Knowledge Clustering',
            '🚀 Project HUB',
            '📦 Smart Resources',
            '📊 Dashboard',
            '🤖 AI Agents',
          ].map((feature) => (
            <div
              key={feature}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
