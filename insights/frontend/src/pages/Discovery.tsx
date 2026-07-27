import { useState } from 'react';
import IdeaInput from '../components/discovery/IdeaInput';
import ValidationResult, { type DiscoveryResult } from '../components/discovery/ValidationResult';
import { discoverIdea } from '../api/projects';

const LOADING_STEPS = [
  { label: 'Parsing your idea...', icon: '🔍' },
  { label: 'Checking clarity...', icon: '💭' },
  { label: 'Validating feasibility...', icon: '📊' },
  { label: 'Structuring output...', icon: '📋' },
];

export default function Discovery() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (idea: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Simulate step progression (the actual API is a single call)
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 3000);

    try {
      const response = await discoverIdea(idea);
      setResult(response);
    } catch (err: any) {
      const message = err?.response?.data?.detail || err?.message || 'Something went wrong';
      setError(message);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

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

      {/* Show result or input */}
      {result ? (
        <div>
          {/* Back button */}
          <button
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '20px',
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
            ← New Discovery
          </button>
          <ValidationResult result={result} />
        </div>
      ) : (
        <>
          <IdeaInput onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Loading indicator */}
          {isLoading && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '24px',
                padding: '24px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                maxWidth: '760px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                🧠 AI is analyzing your idea...
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {LOADING_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: i <= loadingStep ? 1 : 0.3,
                      transition: 'opacity 0.5s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: i < loadingStep ? 'var(--accent-success)' : i === loadingStep ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        transition: 'background 0.3s ease',
                      }}
                    >
                      {i < loadingStep ? '✓' : step.icon}
                    </div>
                    <span style={{ fontSize: '13px', color: i <= loadingStep ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {step.label}
                    </span>
                    {i === loadingStep && (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid var(--accent-primary)',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '16px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                color: 'var(--accent-danger)',
                fontSize: '14px',
                maxWidth: '760px',
              }}
            >
              ❌ {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
