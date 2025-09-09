import React, { useState } from 'react';

function WhatMakesYouYou({ onNext }) {
  const communicationStyles = [
    'I stay on WhatsApp all day',
    'Big time texter',
    'Phone caller',
    'Video chatter',
    'I\'m slow to answer on WhatsApp',
    'Bad texter',
    'Better in person'
  ];

  const loveLanguages = [
    'Thoughtful gestures',
    'Presents',
    'Touch',
    'Compliments',
    'Time together'
  ];

  const educationLevels = [
    'Bachelors', 'In College', 'High School', 'PhD',
    'In Grad School', 'Masters', 'Trade School'
  ];

  const zodiacSigns = [
    'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus',
    'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
  ];

  const [communication, setCommunication] = useState('');
  const [love, setLove] = useState('');
  const [education, setEducation] = useState('');
  const [zodiac, setZodiac] = useState('');

  const isComplete = [communication, love, education, zodiac].every(Boolean);

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
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    paddingTop: '100px',
    paddingBottom: '40px',
    boxSizing: 'border-box',
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
    width: 'calc(100% - 40px)',
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'translateY(0)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
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

  const datingSectionTitleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 16,
    textAlign: 'center',
  };

  const datingOptionGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 24,
  };

  const datingOptionStyle = {
    padding: '12px 16px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    border: '2px solid rgba(255, 107, 157, 0.2)',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#2d3748',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px rgba(255, 107, 157, 0.1)',
  };

  const datingBtnStyle = {
    width: '100%',
    padding: '18px 24px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    fontSize: 18,
    fontWeight: 700,
    marginTop: 24,
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
    
    .dating-option:hover {
      transform: translateY(-2px);
      border-color: #ff6b9d;
      box-shadow: 0 4px 16px rgba(255, 107, 157, 0.2);
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

  const renderOptions = (options, selected, setSelected) => (
    <div style={datingOptionGroupStyle}>
      {options.map((opt, i) => (
        <div
          key={i}
          onClick={() => setSelected(opt)}
          className="dating-option"
          style={{
            ...datingOptionStyle,
            backgroundColor: selected === opt ? 'rgba(255, 107, 157, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: selected === opt ? '2px solid #ff6b9d' : '2px solid rgba(255, 107, 157, 0.2)',
            color: selected === opt ? '#ff6b9d' : '#2d3748',
            boxShadow: selected === opt ? '0 4px 16px rgba(255, 107, 157, 0.2)' : '0 2px 8px rgba(255, 107, 157, 0.1)',
          }}
        >
          {opt}
        </div>
      ))}
    </div>
  );

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
        
        <h2 style={datingTitleStyle}>What else makes you, you?</h2>
        <p style={datingSubtitleStyle}>
          Don't hold back. Authenticity attracts authenticity.
        </p>

        <div style={{ marginBottom: 20, width: '100%' }}>
          <h4 style={datingSectionTitleStyle}>What is your communication style?</h4>
          {renderOptions(communicationStyles, communication, setCommunication)}
        </div>

        <div style={{ marginBottom: 20, width: '100%' }}>
          <h4 style={datingSectionTitleStyle}>How do you receive love?</h4>
          {renderOptions(loveLanguages, love, setLove)}
        </div>

        <div style={{ marginBottom: 20, width: '100%' }}>
          <h4 style={datingSectionTitleStyle}>What is your education level?</h4>
          {renderOptions(educationLevels, education, setEducation)}
        </div>

        <div style={{ marginBottom: 20, width: '100%' }}>
          <h4 style={datingSectionTitleStyle}>What is your zodiac sign?</h4>
          {renderOptions(zodiacSigns, zodiac, setZodiac)}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '24px' 
        }}>
          <button
            style={{
              ...datingBtnStyle,
              maxWidth: '300px',
              width: '100%',
              background: isComplete ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' : 'rgba(255, 107, 157, 0.3)',
              cursor: isComplete ? 'pointer' : 'not-allowed',
              opacity: isComplete ? 1 : 0.6,
            }}
            onClick={() => onNext([communication, love, education, zodiac ], 8)}
            disabled={!isComplete}
            className="dating-btn"
          >
            💕 Continue {[
              communication, love, education, zodiac
            ].filter(Boolean).length}/4
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhatMakesYouYou;