import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

// Add keyframe animation for Messages background
const addMessagesAnimation = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes messagesGradient {
      0% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
      25% { background-position: 100% 50%, 100% 100%, 100% 100%, 100% 100%; }
      50% { background-position: 100% 0%, 0% 100%, 100% 0%, 0% 100%; }
      75% { background-position: 0% 100%, 100% 0%, 0% 100%, 100% 0%; }
      100% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
    }
    @keyframes messagesFloat {
      0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
      25% { transform: translateY(-12px) scale(1.05) rotate(90deg); }
      50% { transform: translateY(-20px) scale(0.95) rotate(180deg); }
      75% { transform: translateY(-8px) scale(1.02) rotate(270deg); }
    }
  `;
  document.head.appendChild(style);
  return style;
};

const Messages = () => {
  const [messageUsers, setMessageUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessageUsers();
  }, []);

  // Add background animation
  useEffect(() => {
    const style = addMessagesAnimation();
    return () => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const fetchMessageUsers = async () => {
    try {
      const userid = sessionStorage.getItem('userid');
      if (!userid) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8000/api/get_message_users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid })
      });

      const data = await response.json();
      if (data.success) {
        setMessageUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching message users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (otherUserId) => {
    navigate(`/chat/${otherUserId}`);
  };

  const pageStyle = {
    minHeight: 'calc(100vh - 200px)', // Account for navbar and footer
    width: '100vw',
    background: `
      linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
      radial-gradient(circle at 30% 20%, rgba(255, 107, 157, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(79, 172, 254, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.2) 0%, transparent 70%)
    `,
    backgroundSize: '400% 400%, 100% 100%, 100% 100%, 100% 100%',
    animation: 'messagesGradient 22s ease infinite',
    paddingTop: '100px',
    paddingBottom: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box',
    position: 'relative',
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '16px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#c44569',
    margin: 0,
  };

  const userCardStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 107, 157, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const avatarStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginRight: '16px',
    objectFit: 'cover',
    border: '3px solid #ff6b9d',
  };

  const userInfoStyle = {
    flex: 1,
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
  };

  const messageCountStyle = {
    fontSize: '14px',
    color: '#666',
  };

  const badgeStyle = {
    background: '#ff4757',
    color: 'white',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '16px',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666',
  };

  const backButtonStyle = {
    background: 'rgba(255, 107, 157, 0.1)',
    border: '2px solid #ff6b9d',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#ff6b9d',
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '18px', color: '#666' }}>Loading messages...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Floating animated elements */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '8%',
        width: '65px',
        height: '65px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'messagesFloat 10s ease-in-out infinite',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }} />
      <div style={{
        position: 'absolute',
        top: '28%',
        right: '10%',
        width: '50px',
        height: '50px',
        background: 'rgba(240, 147, 251, 0.18)',
        borderRadius: '50%',
        animation: 'messagesFloat 8s ease-in-out infinite reverse',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(240, 147, 251, 0.3)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '28%',
        left: '12%',
        width: '45px',
        height: '45px',
        background: 'rgba(79, 172, 254, 0.15)',
        borderRadius: '50%',
        animation: 'messagesFloat 12s ease-in-out infinite',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(79, 172, 254, 0.25)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '18%',
        right: '8%',
        width: '55px',
        height: '55px',
        background: 'rgba(255, 107, 157, 0.16)',
        borderRadius: '50%',
        animation: 'messagesFloat 9s ease-in-out infinite reverse',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 107, 157, 0.26)',
      }} />

      <div style={containerStyle}>
        <div style={headerStyle}>
          <button
            style={backButtonStyle}
            onClick={() => navigate(-1)}
            onMouseEnter={(e) => {
              e.target.style.background = '#ff6b9d';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 107, 157, 0.1)';
              e.target.style.color = '#ff6b9d';
            }}
          >
            <FaArrowLeft />
          </button>
          <FaEnvelope style={{ fontSize: '32px', color: '#ff6b9d' }} />
          <h1 style={titleStyle}>Messages</h1>
        </div>

        {messageUsers.length === 0 ? (
          <div style={emptyStateStyle}>
            <FaEnvelope style={{ fontSize: '64px', color: '#ddd', marginBottom: '16px' }} />
            <h3 style={{ color: '#999', marginBottom: '8px' }}>No messages yet</h3>
            <p style={{ color: '#666' }}>When someone sends you a message, they'll appear here.</p>
          </div>
        ) : (
          <div>
            {messageUsers.map((user) => (
              <div
                key={user.userid}
                style={userCardStyle}
                onClick={() => handleChatClick(user.userid)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 157, 0.2)';
                  e.currentTarget.style.borderColor = '#ff6b9d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 157, 0.2)';
                }}
              >
                <img
                  src={user.profilePic || '/default-avatar.png'}
                  alt={`${user.name}'s profile`}
                  style={avatarStyle}
                />
                <div style={userInfoStyle}>
                  <div style={nameStyle}>{user.name}</div>
                  <div style={messageCountStyle}>
                    {user.unread_count} new message{user.unread_count !== 1 ? 's' : ''}
                  </div>
                </div>
                {user.unread_count > 0 && (
                  <div style={badgeStyle}>
                    {user.unread_count}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
