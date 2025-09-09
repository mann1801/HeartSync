import React, { useState } from 'react';

function WhatAreYouInto({ onNext }) {
  const MIN_SELECTION = 10;
  const MAX_SELECTION = 10;

  const categories = {
    'Creativity': ['Poetry', 'Sneakers', 'Freelancing', 'Photography', 'Choir', 'Cosplay', 'Content Creation', 'Vintage fashion', 'Investing', 'Singing', 'Language Exchange', 'Writing', 'Literature', 'NFTs', 'Tattoos', 'Painting', 'Upcycling', 'Entrepreneurship', 'Acapella', 'Musical Instrument', 'Musical Writing', 'Dancing', 'Exchange Program', 'Art', 'Real Estate', 'Drawing', 'Blogging', 'Fashion', 'DIY'],
    'Social and content': ['Instagram', 'SoundCloud', 'Pinterest', 'Spotify', 'Social Media', 'Vlogging', 'YouTube', 'Virtual Reality', 'Memes', 'Metaverse', 'Podcasts', 'TikTok', 'Twitch', 'Netflix'],
    'Sports and fitness': ['Freeletics', 'Cricket', 'Ice Hockey', 'Sports Shooting', 'Athletics', 'Sports', 'Walking', 'Beach sports', 'Fitness classes', 'Skating', 'Rugby', 'Boxing', 'Badminton', 'Pilates', 'Cheerleading', 'Pole Dancing', 'Car Racing', 'Motor Sports', 'Jogging', 'Football', 'Tennis', 'Skateboarding'],
    'Music': ['Bhangra', 'K-Pop', 'Gospel music', 'Music bands', 'Rock music', 'Soul music', 'Pop music', 'Punk rock', 'Rap music', 'Folk music', 'Latin music', 'Alternative music', 'Techno', 'Jazz', 'House music', 'EDM', 'R&B', 'Indie music', 'Opera', 'Heavy Metal', 'Funk music', 'Reggaeton', 'Country Music', 'Hip Hop', 'J-Pop', 'Electronic Music', 'Grime', '90s Britpop', 'Trap Music'],
    'Gaming': ['Ludo', 'PlayStation', 'E-Sports', 'Fortnite', 'Xbox', 'League of Legends', 'Nintendo', 'Among Us', 'Atari', 'Roblox'],
    'Going out': ['Festivals', 'Stand up Comedy', 'Escape Rooms', 'Bars', 'Thrifting', 'Museums', 'Raves', 'Drive-in Cinema', 'Musical theater', 'Cafe hopping', 'Aquarium', 'Clubbing', 'Exhibition', 'Shopping', 'Cars', 'Pub Quiz', 'Happy hour', 'Karaoke', 'House Parties', 'Theater', 'Shisha', 'Rollerskating', 'Live Music', 'Bar Hopping', 'Bowling'],
    'Outdoors and adventure': ['Road Trips', 'Rowing', 'Diving', 'Jetskiing'],
    'Fan favorites': ['90s Kid', 'Comic-con', 'Harry Potter', 'NBA', 'WWE', 'Dungeons & Dragons', 'Meme', 'Marvel', 'Anime'],
    'Movies and TV Shows': ['Action', 'Romance', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Documentaries', 'Bollywood', 'K-Drama', 'Crime Shows', 'Animated', 'Sitcoms', 'Reality TV'],
    'Wellness': ['Yoga', 'Meditation', 'Journaling', 'Breathwork', 'Mindfulness', 'Therapy', 'Spa', 'Healthy Eating', 'Home Remedies', 'Fitness Tracker']
  };

  const [selected, setSelected] = useState([]);
  const [maxError, setMaxError] = useState(false);

  const toggleInterest = (interest) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(item => item !== interest));
      setMaxError(false);
    } else {
      if (selected.length >= MAX_SELECTION) {
        setMaxError(true);
        return;
      }
      setSelected([...selected, interest]);
      setMaxError(false);
    }
  };

  const removeInterest = (interest) => {
    setSelected(selected.filter(item => item !== interest));
    setMaxError(false);
  };

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

  const datingSelectedContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  };

  const datingSelectedItemStyle = {
    padding: '8px 16px',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#ff6b9d',
    border: '2px solid rgba(255, 107, 157, 0.3)',
    transition: 'all 0.3s ease',
  };

  const datingRemoveIconStyle = {
    cursor: 'pointer',
    color: '#ff6b9d',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'all 0.3s ease',
  };

  const datingCategoryStyle = {
    marginBottom: 32,
    width: '100%',
  };

  const datingCategoryTitleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 16,
    textAlign: 'center',
  };

  const datingOptionsGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  };

  const datingOptionStyle = {
    padding: '10px 16px',
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
    userSelect: 'none',
  };

  const datingErrorStyle = {
    color: '#e53e3e',
    fontSize: 14,
    marginBottom: 16,
    fontWeight: 500,
    textAlign: 'center',
    padding: '12px 16px',
    background: 'rgba(229, 62, 62, 0.1)',
    borderRadius: 12,
    border: '1px solid rgba(229, 62, 62, 0.2)',
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
    
    .dating-selected-item:hover {
      background-color: rgba(255, 107, 157, 0.2);
      transform: translateY(-1px);
    }
    
    .dating-remove-icon:hover {
      color: #e53e3e;
      transform: scale(1.2);
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
        
        <h2 style={datingTitleStyle}>What are you into?</h2>
        <p style={datingSubtitleStyle}>
          Select at least 10 interests to continue.
        </p>

        <div style={datingSelectedContainerStyle}>
          {selected.map((item, idx) => (
            <div key={idx} style={datingSelectedItemStyle} className="dating-selected-item">
              {item}
              <span 
                style={datingRemoveIconStyle} 
                className="dating-remove-icon"
                onClick={() => removeInterest(item)}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        {Object.entries(categories).map(([category, interests]) => (
          <div key={category} style={datingCategoryStyle}>
            <h4 style={datingCategoryTitleStyle}>{category}</h4>
            <div style={datingOptionsGroupStyle}>
              {interests.map((interest, idx) => {
                const isSelected = selected.includes(interest);
                const isDisabled = !isSelected && selected.length >= MAX_SELECTION;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleInterest(interest)}
                    className="dating-option"
                    style={{
                      ...datingOptionStyle,
                      backgroundColor: isSelected ? 'rgba(255, 107, 157, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                      color: isSelected ? '#ff6b9d' : '#2d3748',
                      border: isSelected ? '2px solid #ff6b9d' : '2px solid rgba(255, 107, 157, 0.2)',
                      opacity: isDisabled ? 0.5 : 1,
                      pointerEvents: isDisabled ? 'none' : 'auto',
                      boxShadow: isSelected ? '0 4px 16px rgba(255, 107, 157, 0.2)' : '0 2px 8px rgba(255, 107, 157, 0.1)',
                    }}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {maxError && (
          <div style={datingErrorStyle}>
            You can select up to 10 interests only.
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '24px' 
        }}>
          <button
            onClick={() => onNext({ interests: selected })}
            disabled={selected.length < MIN_SELECTION}
            style={{
              ...datingBtnStyle,
              maxWidth: '300px',
              width: '100%',
              background: selected.length >= MIN_SELECTION ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' : 'rgba(255, 107, 157, 0.3)',
              cursor: selected.length >= MIN_SELECTION ? 'pointer' : 'not-allowed',
              opacity: selected.length >= MIN_SELECTION ? 1 : 0.6,
            }}
            className="dating-btn"
          >
            💕 Continue {selected.length}/10
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhatAreYouInto;