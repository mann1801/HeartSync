import React, { useState } from 'react';

function EducationInput({onNext}) {
  const [school, setSchool] = useState('');

  // Enhanced dating app theme with modern design
  const datingBgStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: `
      linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
      radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(240, 147, 251, 0.2) 0%, transparent 50%)
    `,
    backgroundSize: '400% 400%, 100% 100%, 100% 100%, 100% 100%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    overflow: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
  };

  const datingCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 32,
    boxShadow: `
      0 20px 60px rgba(255, 107, 157, 0.2),
      0 8px 32px rgba(245, 87, 108, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    padding: 50,
    maxWidth: 600,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'translateY(0)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const datingTitleStyle = {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 16,
    fontWeight: 800,
    fontSize: 28,
    letterSpacing: -0.5,
    position: 'relative',
  };

  const datingSubtitleStyle = {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginBottom: 32,
    fontWeight: 400,
    lineHeight: 1.5,
  };

  const datingInputStyle = {
    width: '100%',
    padding: '16px 20px',
    marginTop: 8,
    marginBottom: 20,
    border: '2px solid rgba(255, 107, 157, 0.2)',
    borderRadius: 16,
    fontSize: 16,
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#2d3748',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(255, 107, 157, 0.1)',
    backdropFilter: 'blur(10px)',
  };

  const datingSubtextStyle = {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 32,
    textAlign: 'center',
    fontStyle: 'italic',
  };

  const datingActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '16px',
  };

  const datingSkipBtnStyle = {
    backgroundColor: 'transparent',
    border: '2px solid rgba(255, 107, 157, 0.3)',
    color: '#ff6b9d',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '16px 24px',
    borderRadius: 16,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    flex: 1,
  };

  const datingNextBtnStyle = {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(255, 107, 157, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: 0.5,
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  };

  // Floating hearts background styles
  const floatingHeartsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const heartStyle = {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.1)',
    fontSize: '20px',
    animation: 'float 6s ease-in-out infinite',
  };

  // CSS animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes gradientShift {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .dating-card:hover {
      transform: translateY(-8px);
      box-shadow: 
        0 25px 80px rgba(255, 107, 157, 0.25),
        0 12px 40px rgba(245, 87, 108, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }
    
    .dating-input:focus {
      border-color: #ff6b9d;
      box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1);
      transform: translateY(-2px);
    }
    
    .dating-skip-btn:hover {
      background: rgba(255, 107, 157, 0.1);
      border-color: #ff6b9d;
      transform: translateY(-2px);
    }
    
    .dating-next-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(255, 107, 157, 0.4);
    }
    
    .dating-next-btn:active {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(styleSheet);

  return (
    <div style={datingBgStyle}>
      {/* Floating hearts background */}
      <div style={floatingHeartsStyle}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              ...heartStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      <div style={datingCardStyle} className="dating-card">
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '24px', color: 'white' }}>💕</span>
        </div>
        
        <h2 style={datingTitleStyle}>If studying is your thing...</h2>
        <p style={datingSubtitleStyle}>
          Tell us about your educational journey
        </p>
        
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Enter school name, past or current"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            style={datingInputStyle}
            className="dating-input"
          />
          <span style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#ff6b9d',
            fontSize: '18px',
          }}>🎓</span>
        </div>
        
        <p style={datingSubtextStyle}>This is how it'll appear on your profile.</p>

        <div style={datingActionsStyle}>
          <button 
            onClick={() => onNext('', 6)} 
            style={datingSkipBtnStyle}
            className="dating-skip-btn"
          >
            Skip
          </button>
          <button
            onClick={() => onNext(school, 6)}
            disabled={!school.trim()}
            style={{
              ...datingNextBtnStyle,
              background: school.trim() ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' : 'rgba(255, 107, 157, 0.3)',
              cursor: school.trim() ? 'pointer' : 'not-allowed',
              opacity: school.trim() ? 1 : 0.6,
            }}
            className="dating-next-btn"
          >
            💕 Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationInput;