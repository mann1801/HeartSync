import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userid = sessionStorage.getItem('userid');
    if (!userid) {
      navigate('/login');
      return;
    }
    setCurrentUser(userid);
    fetchChatUser();
  }, [userId, navigate]);

  const fetchChatUser = async () => {
    try {
      // For now, we'll create a basic user object
      // In a real app, you'd fetch the user details from the backend
      const response = await fetch('http://localhost:8000/api/get_user_profile/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: userId })
      });

      if (response.ok) {
        const data = await response.json();
        setChatUser(data.user);
      } else {
        // Fallback if API doesn't exist yet
        setChatUser({
          userid: userId,
          name: userId, // Use userid as name for now
          profilePic: null,
          interests: []
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      // Fallback user object
      setChatUser({
        userid: userId,
        name: userId,
        profilePic: null,
        interests: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/messages');
  };

  const handleMessagesRead = () => {
    // Refresh message counts or handle read status
    console.log('Messages marked as read');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        paddingTop: '80px'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading chat...</div>
      </div>
    );
  }

  if (!currentUser || !chatUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        paddingTop: '80px'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Chat not found</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      paddingTop: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Chat
        currentUser={currentUser}
        chatUser={chatUser}
        onClose={handleClose}
        onMessagesRead={handleMessagesRead}
      />
    </div>
  );
};

export default ChatPage;
