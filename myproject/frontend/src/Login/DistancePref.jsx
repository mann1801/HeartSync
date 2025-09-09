import React, { useState } from 'react';

function DistancePreference({onNext}) {
  const [distance, setDistance] = useState(80);

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
    paddingTop: '80px',
    paddingBottom: '20px',
    boxSizing: 'border-box',
  };

  const datingCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    boxShadow: `
      0 20px 60px rgba(255, 107, 157, 0.2),
      0 8px 32px rgba(245, 87, 108, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    padding: 30,
    maxWidth: 480,
    width: '90%',
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
    marginBottom: 12,
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: -0.5,
    position: 'relative',
  };

  const datingSubtitleStyle = {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 400,
    lineHeight: 1.5,
  };

  const datingLabelStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 12,
    textAlign: 'center',
  };

  const datingSliderBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    padding: '0 16px',
  };

  const datingSliderStyle = {
    width: '85%',
    height: '8px',
    borderRadius: '4px',
    background: 'rgba(255, 107, 157, 0.2)',
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',
  };

  const datingDistanceValueStyle = {
    fontSize: 16,
    fontWeight: 700,
    color: '#ff6b9d',
    minWidth: '60px',
    textAlign: 'center',
  };

  const datingNoteStyle = {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  };

  const datingBtnStyle = {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 16,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(255, 107, 157, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: 0.5,
    position: 'relative',
    overflow: 'hidden',
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
    
    .dating-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
      transition: all 0.3s ease;
    }
    
    .dating-slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
      box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
    }
    
    .dating-slider::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
      transition: all 0.3s ease;
    }
    
    .dating-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(255, 107, 157, 0.4);
    }
    
    .dating-btn:active {
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
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '20px', color: 'white' }}>💕</span>
        </div>
        
        <h2 style={datingTitleStyle}>Your distance preference?</h2>
        <p style={datingSubtitleStyle}>
          Use the slider to set the maximum distance you would like potential matches to be located.
        </p>

        <label style={datingLabelStyle}>Distance preference</label>
        <div style={datingSliderBoxStyle}>
          <input
            type="range"
            min="1"
            max="160"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={datingSliderStyle}
            className="dating-slider"
          />
          <span style={datingDistanceValueStyle}>{distance} km</span>
        </div>

        <p style={datingNoteStyle}>You can change preferences later in Settings</p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '16px' 
        }}>
          <button
            onClick={() => onNext(parseInt(distance) , 5)}
            style={{
              ...datingBtnStyle,
              maxWidth: '300px',
              width: '100%',
            }}
            className="dating-btn"
          >
            💕 Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default DistancePreference;