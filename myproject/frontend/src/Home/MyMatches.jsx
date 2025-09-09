import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';

// Add keyframe animation for MyMatches background
const addMyMatchesAnimation = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes myMatchesGradient {
      0% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
      25% { background-position: 100% 50%, 100% 100%, 100% 100%, 100% 100%; }
      50% { background-position: 100% 0%, 0% 100%, 100% 0%, 0% 100%; }
      75% { background-position: 0% 100%, 100% 0%, 0% 100%, 100% 0%; }
      100% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
    }
    @keyframes myMatchesFloat {
      0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
      25% { transform: translateY(-15px) scale(1.1) rotate(90deg); }
      50% { transform: translateY(-25px) scale(0.9) rotate(180deg); }
      75% { transform: translateY(-10px) scale(1.05) rotate(270deg); }
    }
  `;
  document.head.appendChild(style);
  return style;
};

function MyMatches() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatUser, setChatUser] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});



  useEffect(() => {
    const userid = sessionStorage.getItem('userid');

    // Fetch user matches
    fetch("http://localhost:8000/api/get_user_matches/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid })
    })
      .then(res => res.json())
      .then(data => {
        setMatches(data.matches || []);
        console.log("💞 Your Matches:", data.matches);

        // Fetch unread message counts for each match
        fetchUnreadCounts(userid, data.matches || []);
      });

    // Mark matches as seen (clear notifications)
    fetch("http://localhost:8000/api/mark_matches_as_seen/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid })
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Matches marked as seen");
      })
      .catch(err => console.error("❌ Error marking matches as seen:", err));

  }, []);

  // Add background animation
  useEffect(() => {
    const style = addMyMatchesAnimation();
    return () => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const fetchUnreadCounts = async (userid, matchList) => {
    const counts = {};

    for (const match of matchList) {
      try {
        const response = await fetch('http://localhost:8000/api/get_unread_messages_for_user/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userid: userid,
            other_userid: match.userid
          })
        });

        const data = await response.json();
        if (data.unread_count > 0) {
          counts[match.userid] = data.unread_count;
        }
      } catch (error) {
        console.error(`Error fetching unread count for ${match.userid}:`, error);
      }
    }

    setUnreadCounts(counts);
  };

  const handleViewDetails = (match) => {
    setSelectedMatch(match);
    setCurrentImageIndex(0);
  };

  const handleCloseDetails = () => {
    setSelectedMatch(null);
    setCurrentImageIndex(0);
  };

  const handleMessage = (match) => {
    setChatUser(match);
    // Clear unread count for this user when opening chat
    setUnreadCounts(prev => {
      const updated = { ...prev };
      delete updated[match.userid];
      return updated;
    });
    // Trigger navbar message count update
    window.dispatchEvent(new CustomEvent('messageCountUpdate'));
  };

  const handleCloseChat = () => {
    setChatUser(null);
  };

  // Handle when messages are read (called from Chat component)
  const handleMessagesRead = () => {
    // Messages read callback - no longer needed for unread counts
  };

  const nextImage = () => {
    if (selectedMatch && selectedMatch.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedMatch.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedMatch && selectedMatch.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedMatch.images.length - 1 : prev - 1
      );
    }
  };

  const pageStyle = {
    minHeight: 'calc(100vh - 200px)', // Account for navbar and footer
    position: 'relative',
    padding: '40px 20px',
    paddingTop: '100px',
    paddingBottom: '40px',
    background: `
      linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #667eea 75%, #764ba2 100%),
      radial-gradient(circle at 20% 30%, rgba(255, 107, 157, 0.3) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(102, 126, 234, 0.3) 0%, transparent 60%),
      radial-gradient(circle at 40% 80%, rgba(240, 147, 251, 0.2) 0%, transparent 50%)
    `,
    backgroundSize: '300% 300%, 100% 100%, 100% 100%, 100% 100%',
    animation: 'myMatchesGradient 25s ease infinite',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle = {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const profileImageStyle = {
    width: '100%',
    maxHeight: '200px',
    borderRadius: '16px',
    objectFit: 'contain',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#f8f9fa',
  };

  const nameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '12px',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  };

  const viewButtonStyle = {
    flex: 1,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(255, 107, 157, 0.3)',
  };

  const messageButtonStyle = {
    flex: 1,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const modalStyle = {
    background: 'white',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageCarouselStyle = {
    position: 'relative',
    marginBottom: '24px',
  };

  const carouselImageStyle = {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '16px',
    backgroundColor: '#f8f9fa',
  };

  const imageNavStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageCounterStyle = {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
  };

  const detailSectionStyle = {
    marginBottom: '20px',
  };

  const detailTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff6b9d',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const detailContentStyle = {
    fontSize: '14px',
    color: '#4a5568',
    lineHeight: '1.6',
  };

  return (
    <div style={pageStyle}>
      {/* Floating animated elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '70px',
        height: '70px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'myMatchesFloat 9s ease-in-out infinite',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '8%',
        width: '45px',
        height: '45px',
        background: 'rgba(240, 147, 251, 0.15)',
        borderRadius: '50%',
        animation: 'myMatchesFloat 7s ease-in-out infinite reverse',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(240, 147, 251, 0.25)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        width: '55px',
        height: '55px',
        background: 'rgba(102, 126, 234, 0.12)',
        borderRadius: '50%',
        animation: 'myMatchesFloat 11s ease-in-out infinite',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(102, 126, 234, 0.22)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '12%',
        width: '35px',
        height: '35px',
        background: 'rgba(255, 107, 157, 0.18)',
        borderRadius: '50%',
        animation: 'myMatchesFloat 8s ease-in-out infinite reverse',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 107, 157, 0.28)',
      }} />

      <div style={containerStyle}>
        <h1 style={titleStyle}>💞 Your Matches</h1>

        {matches.length === 0 ? (
          <div
            style={{
              position: 'absolute',
              top: 'calc(50% + 40px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '0 20px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: '#ffffff',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: '48px 28px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(8px)',
                maxWidth: 520,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                Loading or no matches found
              </div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>
                Try adjusting your preferences or come back later.
              </div>
            </div>
          </div>
        ) : (
          <div style={gridStyle}>
            {matches.map((match) => (
              <div
                key={match.userid}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
              >
                {match.profilePic && (
                  <img
                    src={match.profilePic}
                    alt={`${match.name}'s profile`}
                    style={profileImageStyle}
                  />
                )}

                <h3 style={nameStyle}>{match.name}</h3>

                <div style={buttonContainerStyle}>
                  <button
                    style={viewButtonStyle}
                    onClick={() => handleViewDetails(match)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 157, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 157, 0.3)';
                    }}
                  >
                    👁️ View Details
                  </button>
                  <button
                    style={{ ...messageButtonStyle, position: 'relative' }}
                    onClick={() => handleMessage(match)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(79, 172, 254, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(79, 172, 254, 0.3)';
                    }}
                  >
                    💬 Message
                    {unreadCounts[match.userid] && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#ff4757',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: '2px solid white'
                      }}>
                        {unreadCounts[match.userid]}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedMatch && (
          <div style={modalOverlayStyle} onClick={handleCloseDetails}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <button style={closeButtonStyle} onClick={handleCloseDetails}>
                ×
              </button>

              <h2 style={{ ...nameStyle, marginBottom: '24px', fontSize: '28px' }}>
                {selectedMatch.name}
              </h2>

              {/* Image Carousel */}
              {selectedMatch.images && selectedMatch.images.length > 0 && (
                <div style={imageCarouselStyle}>
                  <img
                    src={selectedMatch.images[currentImageIndex].data}
                    alt={`${selectedMatch.name} photo ${currentImageIndex + 1}`}
                    style={carouselImageStyle}
                  />

                  {selectedMatch.images.length > 1 && (
                    <>
                      <button
                        style={{ ...imageNavStyle, left: '12px' }}
                        onClick={prevImage}
                      >
                        ‹
                      </button>
                      <button
                        style={{ ...imageNavStyle, right: '12px' }}
                        onClick={nextImage}
                      >
                        ›
                      </button>
                      <div style={imageCounterStyle}>
                        {currentImageIndex + 1} / {selectedMatch.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* User Details */}
              <div style={detailSectionStyle}>
                <div style={detailTitleStyle}>Basic Info</div>
                <div style={detailContentStyle}>
                  <strong>Gender:</strong> {selectedMatch.gender}<br />
                  <strong>Education:</strong> {selectedMatch.education || 'Not specified'}<br />
                  <strong>Looking For:</strong> {selectedMatch.lookingFor}<br />
                  <strong>Distance Preference:</strong> {selectedMatch.distance} km
                </div>
              </div>

              <div style={detailSectionStyle}>
                <div style={detailTitleStyle}>Interests</div>
                <div style={detailContentStyle}>
                  {selectedMatch.interests && selectedMatch.interests.length > 0
                    ? selectedMatch.interests.join(', ')
                    : 'No interests specified'}
                </div>
              </div>

              <div style={detailSectionStyle}>
                <div style={detailTitleStyle}>Lifestyle</div>
                <div style={detailContentStyle}>
                  {selectedMatch.lifestyle && selectedMatch.lifestyle.length > 0
                    ? selectedMatch.lifestyle.join(', ')
                    : 'No lifestyle preferences specified'}
                </div>
              </div>

              <div style={detailSectionStyle}>
                <div style={detailTitleStyle}>Personality</div>
                <div style={detailContentStyle}>
                  {selectedMatch.personality && selectedMatch.personality.length > 0
                    ? selectedMatch.personality.join(', ')
                    : 'No personality traits specified'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {chatUser && (
          <Chat
            currentUser={sessionStorage.getItem('userid')}
            chatUser={chatUser}
            onClose={handleCloseChat}
            onMessagesRead={handleMessagesRead}
          />
        )}
      </div>

    </div>
  );
}

export default MyMatches;
