interface FeasibilityDetail {
  score: number;
  reasoning: string;
}

interface ComplexityDetail {
  level: string;
  reasoning: string;
}

interface DiscoveryResult {
  project_id: string;
  title: string;
  core_problem: string;
  domain: string;
  sub_domains: string[];
  target_users: string[];
  refined_idea: string;
  needs_clarification: boolean;
  clarifying_questions: string[];
  feasibility_score: number;
  technical_feasibility: FeasibilityDetail;
  market_need: FeasibilityDetail;
  novelty: FeasibilityDetail;
  implementation_complexity: ComplexityDetail;
  strengths: string[];
  risks: string[];
  suggestions: string[];
  problem_statement: string;
  elevator_pitch: string;
  key_objectives: string[];
  success_metrics: string[];
}

interface ValidationResultProps {
  result: DiscoveryResult;
}

function ScoreGauge({ score, label, reasoning }: { score: number; label: string; reasoning: string }) {
  const getColor = (s: number) => {
    if (s >= 75) return 'var(--accent-success)';
    if (s >= 50) return 'var(--accent-warning)';
    return 'var(--accent-danger)';
  };

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="glow-border"
      style={{
        padding: '20px',
        borderRadius: '14px',
        background: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <svg width="88" height="88" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="44" cy="44" r="36" fill="none" stroke="var(--bg-tertiary)" strokeWidth="6" />
        <circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text
          x="44"
          y="48"
          textAnchor="middle"
          fill={getColor(score)}
          fontSize="18"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          style={{ transform: 'rotate(90deg)', transformOrigin: '44px 44px' }}
        >
          {score}
        </text>
      </svg>
      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>{label}</div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>{reasoning}</div>
    </div>
  );
}

export default function ValidationResult({ result }: ValidationResultProps) {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '760px' }}>
      {/* Title + Elevator Pitch */}
      <div
        className="glow-border"
        style={{
          padding: '28px',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🎯
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>{result.title}</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Project ID: {result.project_id.slice(0, 8)}...
            </div>
          </div>
        </div>

        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
          {result.elevator_pitch}
        </p>

        {/* Domain + Target Users tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              background: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--accent-primary-light)',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {result.domain}
          </span>
          {result.target_users.map((user) => (
            <span
              key={user}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(139, 92, 246, 0.12)',
                color: 'var(--accent-secondary)',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {user}
            </span>
          ))}
        </div>
      </div>

      {/* Feasibility Scores */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <ScoreGauge score={result.feasibility_score} label="Overall Feasibility" reasoning="Weighted average" />
        <ScoreGauge score={result.technical_feasibility.score} label="Technical" reasoning={result.technical_feasibility.reasoning} />
        <ScoreGauge score={result.market_need.score} label="Market Need" reasoning={result.market_need.reasoning} />
        <ScoreGauge score={result.novelty.score} label="Novelty" reasoning={result.novelty.reasoning} />
      </div>

      {/* Problem Statement */}
      <div
        className="glow-border"
        style={{
          padding: '24px',
          borderRadius: '14px',
          background: 'var(--bg-card)',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
          📄 Problem Statement
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {result.problem_statement}
        </p>
      </div>

      {/* Key Objectives + Success Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div
          className="glow-border"
          style={{ padding: '20px', borderRadius: '14px', background: 'var(--bg-card)' }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            🎯 Key Objectives
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {result.key_objectives.map((obj, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent-success)', flexShrink: 0 }}>✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="glow-border"
          style={{ padding: '20px', borderRadius: '14px', background: 'var(--bg-card)' }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            📏 Success Metrics
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {result.success_metrics.map((metric, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent-primary-light)', flexShrink: 0 }}>◆</span>
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Strengths + Risks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div
          className="glow-border"
          style={{ padding: '20px', borderRadius: '14px', background: 'var(--bg-card)' }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-success)', marginBottom: '10px' }}>
            💪 Strengths
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {result.strengths.map((s, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>• {s}</li>
            ))}
          </ul>
        </div>

        <div
          className="glow-border"
          style={{ padding: '20px', borderRadius: '14px', background: 'var(--bg-card)' }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-warning)', marginBottom: '10px' }}>
            ⚠️ Risks
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {result.risks.map((r, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>• {r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div
          className="glow-border"
          style={{
            padding: '20px',
            borderRadius: '14px',
            background: 'var(--gradient-glow)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary-light)', marginBottom: '10px' }}>
            💡 Suggestions to Improve
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {result.suggestions.map((s, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>→ {s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Clarifying Questions */}
      {result.needs_clarification && result.clarifying_questions.length > 0 && (
        <div
          className="glow-border"
          style={{
            padding: '20px',
            borderRadius: '14px',
            background: 'var(--bg-card)',
            marginTop: '16px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-warning)', marginBottom: '10px' }}>
            ❓ Clarifying Questions
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.clarifying_questions.map((q, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{i + 1}. {q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export type { DiscoveryResult };
