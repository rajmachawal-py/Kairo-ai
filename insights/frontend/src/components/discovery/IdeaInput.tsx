import { useState } from 'react';

const EXAMPLE_IDEAS = [
  'Build an AI solution to reduce food waste in college hostels',
  'Create a platform that connects rural farmers directly with urban consumers using IoT sensors',
  'Develop an AI-powered mental health chatbot for university students',
  'Build a smart waste management system using computer vision for municipalities',
];

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onSubmit, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = () => {
    if (idea.trim().length >= 10 && !isLoading) {
      onSubmit(idea.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div
      className="glow-border"
      style={{
        padding: '32px',
        borderRadius: '16px',
        background: 'var(--bg-card)',
        maxWidth: '760px',
      }}
    >
      {/* Label */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
          What do you want to build?
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Describe your idea in a sentence or two. Our AI will validate, analyze feasibility, and create a structured problem statement.
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Build an AI solution to reduce food waste in college hostels..."
        disabled={isLoading}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '16px',
          borderRadius: '12px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-primary)',
          color: 'var(--text-primary)',
          fontSize: '15px',
          lineHeight: 1.6,
          fontFamily: 'Inter, sans-serif',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          opacity: isLoading ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
        }}
      />

      {/* Character count + submit */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ fontSize: '12px', color: idea.length < 10 ? 'var(--accent-danger)' : 'var(--text-muted)' }}>
          {idea.length} / 2000 characters {idea.length < 10 && idea.length > 0 && '(minimum 10)'}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ctrl+Enter</span>
          <button
            onClick={handleSubmit}
            disabled={idea.trim().length < 10 || isLoading}
            style={{
              padding: '10px 28px',
              borderRadius: '10px',
              background: idea.trim().length >= 10 && !isLoading ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
              color: idea.trim().length >= 10 && !isLoading ? 'white' : 'var(--text-muted)',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: idea.trim().length >= 10 && !isLoading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: idea.trim().length >= 10 && !isLoading ? '0 4px 16px rgba(99, 102, 241, 0.3)' : 'none',
            }}
          >
            {isLoading ? '⏳ Discovering...' : 'Discover →'}
          </button>
        </div>
      </div>

      {/* Example ideas */}
      <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
          💡 Try an example:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {EXAMPLE_IDEAS.map((example) => (
            <button
              key={example}
              onClick={() => setIdea(example)}
              disabled={isLoading}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
