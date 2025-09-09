// import React, { useState, useEffect, useRef } from 'react';

// const Chat = ({ currentUser, chatUser, onClose, onMessagesRead }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [aiContext, setAiContext] = useState(null);
//   const [suggestionsLoading, setSuggestionsLoading] = useState(false);
//   const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);
//   const [showGoToTop, setShowGoToTop] = useState(false);
//   const messagesEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     fetchMessages();
//     markMessagesAsRead(); // Mark messages as read when chat opens
//     // Don't auto-fetch suggestions - only when user clicks robot button
//     // Set up polling for new messages every 3 seconds
//     const interval = setInterval(fetchMessages, 3000);
//     return () => clearInterval(interval);
//   }, [currentUser, chatUser]);

//   const markMessagesAsRead = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/mark_messages_as_read/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           reader_id: currentUser,
//           sender_id: chatUser.userid
//         })
//       });
      
//       if (response.ok) {
//         console.log('✅ Messages marked as read');
//         // Notify parent component that messages have been read
//         if (onMessagesRead) {
//           onMessagesRead();
//         }
//       } else {
//         console.error('❌ Failed to mark messages as read:', response.status);
//       }
//     } catch (error) {
//       console.error('❌ Error marking messages as read:', error);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/get_messages/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user1: currentUser,
//           user2: chatUser.userid
//         })
//       });
      
//       const data = await response.json();
//       if (data.messages) {
//         setMessages(data.messages);
//         // Notify parent component that messages have been read
//         if (onMessagesRead) {
//           onMessagesRead();
//         }
//         // Trigger navbar message count update
//         window.dispatchEvent(new CustomEvent('messageCountUpdate'));
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       setIsLoading(false);
//     }
//   };

//   const fetchAdvancedSuggestions = async () => {
//     try {
//       console.log('🔄 Fetching AI suggestions...');
//       const response = await fetch('http://localhost:8000/api/get_chat_suggestions/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sender_id: currentUser,
//           receiver_id: chatUser.userid
//         })
//       });
      
//       const data = await response.json();
//       console.log('📥 Received suggestions:', data.suggestions);
//       console.log('🤖 AI Type:', data.context_info?.ai_type);
      
//       if (data.suggestions && data.suggestions.length > 0) {
//         // Only update suggestions if we got valid ones
//         const validSuggestions = data.suggestions.filter(s => {
//           if (!s || s.length < 10) return false;
          
//           const lowerS = s.toLowerCase();
//           const refusalIndicators = [
//             "i can't generate",
//             "i cannot generate",
//             "i can't assist",
//             "i cannot assist",
//             "phishing",
//             "personal information",
//             "sensitive information",
//             "dietary restrictions",
//             "dating app conversations",
//             "is there anything else i can help you with",
//             "inappropriate",
//             "not appropriate",
//             "against my guidelines"
//           ];
          
//           return !refusalIndicators.some(indicator => lowerS.includes(indicator));
//         });
        
//         if (validSuggestions.length > 0) {
//           console.log('✅ Setting valid suggestions:', validSuggestions);
//           setSuggestions(validSuggestions);
//         } else {
//           console.log('⚠️ No valid suggestions, using fallback');
//           setSuggestions([
//             `Hey ${chatUser.name}! How's your day going?`,
//             "What's been the highlight of your week so far?",
//             "I'd love to hear more about what you're passionate about!",
//             "What's something that always puts you in a good mood?"
//           ]);
//         }
        
//         // Store AI context info for enhanced user experience
//         if (data.context_info) {
//           setAiContext(data.context_info);
//           console.log('🤖 Advanced AI Context:', data.context_info);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching advanced AI suggestions:', error);
//       // Fallback to basic suggestions if AI fails
//       setSuggestions([
//         `Hey ${chatUser.name}! How's your day going?`,
//         "What's been the highlight of your week so far?",
//         "I'd love to hear more about what you're passionate about!",
//         "What's something that always puts you in a good mood?"
//       ]);
//     }
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const response = await fetch('http://localhost:8000/api/send_message/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sender: currentUser,
//           receiver: chatUser.userid,
//           content: newMessage.trim()
//         })
//       });

//       if (response.ok) {
//         setNewMessage('');
//         setShowSuggestions(false);
//         fetchMessages(); // Refresh messages
//         // Reset suggestions state so they can be refreshed when user clicks robot button again
//         setSuggestionsLoaded(false);
//       } else {
//         const error = await response.json();
//         alert(error.error || 'Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message');
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setNewMessage(suggestion);
//     setShowSuggestions(false);
//   };

//   const toggleSuggestions = async () => {
//     if (!showSuggestions) {
//       // User is opening suggestions
//       setShowSuggestions(true);
      
//       // Fetch suggestions if not already loaded and not currently loading
//       if (!suggestionsLoaded && !suggestionsLoading) {
//         console.log('🔄 Starting to fetch suggestions...');
//         setSuggestionsLoading(true);
//         try {
//           await fetchAdvancedSuggestions();
//           setSuggestionsLoaded(true);
//           console.log('✅ Suggestions loaded successfully');
//         } catch (error) {
//           console.error('❌ Error loading suggestions:', error);
//         } finally {
//           setSuggestionsLoading(false);
//         }
//       } else if (suggestionsLoaded) {
//         console.log('✅ Using cached suggestions');
//       } else {
//         console.log('⏳ Suggestions already loading...');
//       }
//     } else {
//       // User is closing suggestions
//       setShowSuggestions(false);
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   const modalOverlayStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     background: 'rgba(0, 0, 0, 0.8)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//     padding: '20px',
//   };

//   const chatContainerStyle = {
//     background: 'white',
//     borderRadius: '24px',
//     width: '100%',
//     maxWidth: '500px',
//     height: '600px',
//     display: 'flex',
//     flexDirection: 'column',
//     overflow: 'hidden',
//     boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
//   };

//   const headerStyle = {
//     background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//     color: 'white',
//     padding: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   };

//   const userInfoStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//   };

//   const avatarStyle = {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '2px solid rgba(255,255,255,0.3)',
//   };

//   const closeButtonStyle = {
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     fontSize: '24px',
//     cursor: 'pointer',
//     padding: '4px',
//     borderRadius: '50%',
//     width: '32px',
//     height: '32px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   };

//   const messagesContainerStyle = {
//     flex: 1,
//     overflowY: 'auto',
//     padding: '20px',
//     background: '#f8f9fa',
//   };

//   const messageStyle = (isOwn) => ({
//     display: 'flex',
//     justifyContent: isOwn ? 'flex-end' : 'flex-start',
//     marginBottom: '12px',
//   });

//   const messageBubbleStyle = (isOwn) => ({
//     maxWidth: '70%',
//     padding: '12px 16px',
//     borderRadius: isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
//     background: isOwn 
//       ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' 
//       : 'white',
//     color: isOwn ? 'white' : '#333',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     wordWrap: 'break-word',
//   });

//   const messageTimeStyle = {
//     fontSize: '11px',
//     opacity: 0.7,
//     marginTop: '4px',
//     textAlign: 'right',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     gap: '4px',
//   };

//   const tickStyle = {
//     fontSize: '12px',
//     display: 'inline-flex',
//     alignItems: 'center',
//   };

//   // WhatsApp-style message status indicators
//   const renderMessageStatus = (message, isOwn) => {
//     if (!isOwn) return null; // Only show ticks for sent messages
    
//     if (message.read) {
//       // Dark blue double ticks (read) - more visible against pink background
//       return (
//         <span style={{ ...tickStyle, color: '#1565c0', fontWeight: 'bold' }}>
//           ✓✓
//         </span>
//       );
//     } else if (message.delivered) {
//       // Gray double ticks (delivered but not read)
//       return (
//         <span style={{ ...tickStyle, color: '#9e9e9e' }}>
//           ✓✓
//         </span>
//       );
//     } else {
//       // Single tick (sent but not delivered)
//       return (
//         <span style={{ ...tickStyle, color: '#9e9e9e' }}>
//           ✓
//         </span>
//       );
//     }
//   };

//   const inputContainerStyle = {
//     padding: '20px',
//     background: 'white',
//     borderTop: '1px solid #e9ecef',
//   };

//   const inputFormStyle = {
//     display: 'flex',
//     gap: '12px',
//     alignItems: 'center',
//   };

//   const messageInputStyle = {
//     flex: 1,
//     padding: '12px 16px',
//     border: '2px solid #e9ecef',
//     borderRadius: '25px',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'border-color 0.3s ease',
//     backgroundColor: '#ffffff',
//     color: '#000000',
//   };

//   const sendButtonStyle = {
//     background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '50%',
//     width: '44px',
//     height: '44px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '18px',
//     transition: 'transform 0.2s ease',
//   };

//   const suggestionButtonStyle = {
//     background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '50%',
//     width: '36px',
//     height: '36px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '16px',
//     transition: 'transform 0.2s ease',
//   };

//   const suggestionsContainerStyle = {
//     padding: '16px 20px 20px',
//     background: 'white',
//     maxHeight: showSuggestions ? '320px' : '0',
//     overflow: 'auto',
//     transition: 'max-height 0.3s ease',
//     borderTop: '1px solid #f0f0f0',
//     marginBottom: '8px',
//   };

//   const suggestionChipStyle = {
//     display: 'inline-block',
//     background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//     color: 'white',
//     padding: '8px 12px',
//     margin: '4px',
//     borderRadius: '20px',
//     fontSize: '13px',
//     cursor: 'pointer',
//     transition: 'transform 0.2s ease',
//     boxShadow: '0 2px 8px rgba(255, 107, 157, 0.3)',
//   };

//   const suggestionHeaderStyle = {
//     fontSize: '12px',
//     color: '#666',
//     marginBottom: '8px',
//     fontWeight: '600',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//   };

//   const aiContextStyle = {
//     fontSize: '10px',
//     color: '#999',
//     fontStyle: 'italic',
//     marginBottom: '4px',
//   };

//   const loadingStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100px',
//     color: '#666',
//   };

//   const dateHeaderStyle = {
//     textAlign: 'center',
//     margin: '20px 0 10px',
//     color: '#666',
//     fontSize: '12px',
//     fontWeight: '600',
//   };

//   // Group messages by date
//   const groupMessagesByDate = (messages) => {
//     const groups = {};
//     messages.forEach(message => {
//       const date = formatDate(message.timestamp);
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(message);
//     });
//     return groups;
//   };

//   const messageGroups = groupMessagesByDate(messages);

//   return (
//     <div style={modalOverlayStyle} onClick={onClose}>
//       <div style={chatContainerStyle} onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div style={headerStyle}>
//           <div style={userInfoStyle}>
//             {chatUser.profilePic && (
//               <img 
//                 src={chatUser.profilePic} 
//                 alt={chatUser.name}
//                 style={avatarStyle}
//               />
//             )}
//             <div>
//               <h3 style={{ margin: 0, fontSize: '18px' }}>{chatUser.name}</h3>
//               <div style={{ fontSize: '12px', opacity: 0.8 }}>
//                 {chatUser.interests?.slice(0, 2).join(', ')}
//               </div>
//             </div>
//           </div>
//           <button 
//             style={closeButtonStyle} 
//             onClick={onClose}
//             onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
//             onMouseLeave={(e) => e.target.style.background = 'none'}
//           >
//             ×
//           </button>
//         </div>

//         {/* Messages */}
//         <div style={messagesContainerStyle}>
//           {isLoading ? (
//             <div style={loadingStyle}>Loading messages...</div>
//           ) : (
//             <>
//               {Object.keys(messageGroups).length === 0 ? (
//                 <div style={{
//                   textAlign: 'center',
//                   color: '#666',
//                   marginTop: '50px',
//                   fontSize: '16px'
//                 }}>
//                   <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
//                   <p>Start your conversation with {chatUser.name}!</p>
//                   <p style={{ fontSize: '14px', opacity: 0.7 }}>
//                     Say hello and break the ice
//                   </p>
//                 </div>
//               ) : (
//                 Object.entries(messageGroups).map(([date, dateMessages]) => (
//                   <div key={date}>
//                     <div style={dateHeaderStyle}>{date}</div>
//                     {dateMessages.map((message) => (
//                       <div key={message.id} style={messageStyle(message.sender === currentUser)}>
//                         <div style={messageBubbleStyle(message.sender === currentUser)}>
//                           <div>{message.content}</div>
//                           <div style={messageTimeStyle}>
//                             {formatTime(message.timestamp)}
//                             {renderMessageStatus(message, message.sender === currentUser)}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </>
//           )}
//         </div>

//         {/* Advanced AI Suggestions */}
//         {showSuggestions && suggestions.length > 0 && (
//           <div style={suggestionsContainerStyle}>
//             <div style={suggestionHeaderStyle}>
//               🤖 Local AI Suggestions
//               {aiContext && (
//                 <div style={aiContextStyle}>
//                   {aiContext.ai_type === 'local_ollama' ? '🏠 Offline AI' : 'Online AI'} • 
//                   {aiContext.is_first_contact_today ? ' First contact today' : ` ${aiContext.message_count} messages`}
//                 </div>
//               )}
//             </div>
//             <div>
//               {suggestions.map((suggestion, index) => (
//                 <span
//                   key={index}
//                   style={suggestionChipStyle}
//                   onClick={() => handleSuggestionClick(suggestion)}
//                   onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
//                   onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//                 >
//                   {suggestion}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input */}
//         <div style={inputContainerStyle}>
//           <form style={inputFormStyle} onSubmit={sendMessage}>
//             <button 
//               type="button"
//               style={suggestionButtonStyle}
//               onClick={toggleSuggestions}
//               title="Advanced AI Suggestions"
//               disabled={suggestionsLoading}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//             >
//               {suggestionsLoading ? '⏳' : '🤖'}
//             </button>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder={`Message ${chatUser.name}...`}
//               style={messageInputStyle}
//               onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
//               onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
//             />
//             <button 
//               type="submit" 
//               style={sendButtonStyle}
//               disabled={!newMessage.trim()}
//               onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//             >
//               ➤
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ currentUser, chatUser, onClose, onMessagesRead }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiContext, setAiContext] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();
    // Don't auto-fetch suggestions - only when user clicks robot button
    // Set up polling for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [currentUser, chatUser]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get_messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user1: currentUser,
          user2: chatUser.userid
        })
      });
      
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
        // Notify parent component that messages have been read
        if (onMessagesRead) {
          onMessagesRead();
        }
        // Trigger navbar message count update
        window.dispatchEvent(new CustomEvent('messageCountUpdate'));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setIsLoading(false);
    }
  };

  const fetchAdvancedSuggestions = async () => {
    try {
      console.log('🔄 Fetching AI suggestions...');
      const response = await fetch('http://localhost:8000/api/get_chat_suggestions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: currentUser,
          receiver_id: chatUser.userid
        })
      });
      
      const data = await response.json();
      console.log('📥 Received suggestions:', data.suggestions);
      console.log('🤖 AI Type:', data.context_info?.ai_type);
      
      if (data.suggestions && data.suggestions.length > 0) {
        // Only update suggestions if we got valid ones
        const validSuggestions = data.suggestions.filter(s => {
          if (!s || s.length < 10) return false;
          
          const lowerS = s.toLowerCase();
          const refusalIndicators = [
            "i can't generate",
            "i cannot generate",
            "i can't assist",
            "i cannot assist",
            "phishing",
            "personal information",
            "sensitive information",
            "dietary restrictions",
            "dating app conversations",
            "is there anything else i can help you with",
            "inappropriate",
            "not appropriate",
            "against my guidelines"
          ];
          
          return !refusalIndicators.some(indicator => lowerS.includes(indicator));
        });
        
        if (validSuggestions.length > 0) {
          console.log('✅ Setting valid suggestions:', validSuggestions);
          setSuggestions(validSuggestions);
        } else {
          console.log('⚠️ No valid suggestions, using fallback');
          setSuggestions([
            `Hey ${chatUser.name}! How's your day going?`,
            "What's been the highlight of your week so far?",
            "I'd love to hear more about what you're passionate about!",
            "What's something that always puts you in a good mood?"
          ]);
        }
        
        // Store AI context info for enhanced user experience
        if (data.context_info) {
          setAiContext(data.context_info);
          console.log('🤖 Advanced AI Context:', data.context_info);
        }
      }
    } catch (error) {
      console.error('Error fetching advanced AI suggestions:', error);
      // Fallback to basic suggestions if AI fails
      setSuggestions([
        `Hey ${chatUser.name}! How's your day going?`,
        "What's been the highlight of your week so far?",
        "I'd love to hear more about what you're passionate about!",
        "What's something that always puts you in a good mood?"
      ]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/api/send_message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentUser,
          receiver: chatUser.userid,
          content: newMessage.trim()
        })
      });

      if (response.ok) {
        setNewMessage('');
        setShowSuggestions(false);
        fetchMessages(); // Refresh messages
        // Reset suggestions state so they can be refreshed when user clicks robot button again
        setSuggestionsLoaded(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion);
    setShowSuggestions(false);
  };

  const toggleSuggestions = async () => {
    if (!showSuggestions) {
      // User is opening suggestions
      setShowSuggestions(true);
      
      // Fetch suggestions if not already loaded and not currently loading
      if (!suggestionsLoaded && !suggestionsLoading) {
        console.log('🔄 Starting to fetch suggestions...');
        setSuggestionsLoading(true);
        try {
          await fetchAdvancedSuggestions();
          setSuggestionsLoaded(true);
          console.log('✅ Suggestions loaded successfully');
        } catch (error) {
          console.error('❌ Error loading suggestions:', error);
        } finally {
          setSuggestionsLoading(false);
        }
      } else if (suggestionsLoaded) {
        console.log('✅ Using cached suggestions');
      } else {
        console.log('⏳ Suggestions already loading...');
      }
    } else {
      // User is closing suggestions
      setShowSuggestions(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
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

  const chatContainerStyle = {
    background: 'white',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '500px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid rgba(255,255,255,0.3)',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    background: '#f8f9fa',
  };

  const messageStyle = (isOwn) => ({
    display: 'flex',
    justifyContent: isOwn ? 'flex-end' : 'flex-start',
    marginBottom: '12px',
  });

  const messageBubbleStyle = (isOwn) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
    background: isOwn 
      ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' 
      : 'white',
    color: isOwn ? 'white' : '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    wordWrap: 'break-word',
  });

  const messageTimeStyle = {
    fontSize: '11px',
    opacity: 0.7,
    marginTop: '4px',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '4px',
  };

  const tickStyle = {
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
  };

  // WhatsApp-style message status indicators
  const renderMessageStatus = (message, isOwn) => {
    if (!isOwn) return null; // Only show ticks for sent messages
    
    if (message.read) {
      // Dark blue double ticks (read) - more visible against pink background
      return (
        <span style={{ ...tickStyle, color: '#1565c0', fontWeight: 'bold' }}>
          ✓✓
        </span>
      );
    } else if (message.delivered) {
      // Gray double ticks (delivered but not read)
      return (
        <span style={{ ...tickStyle, color: '#9e9e9e' }}>
          ✓✓
        </span>
      );
    } else {
      // Single tick (sent but not delivered)
      return (
        <span style={{ ...tickStyle, color: '#9e9e9e' }}>
          ✓
        </span>
      );
    }
  };

  const inputContainerStyle = {
    padding: '20px',
    background: 'white',
    borderTop: '1px solid #e9ecef',
  };

  const inputFormStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  };

  const messageInputStyle = {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '25px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  const sendButtonStyle = {
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  };

  const suggestionButtonStyle = {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'transform 0.2s ease',
  };

  const suggestionsContainerStyle = {
    padding: '16px 20px 20px',
    background: 'white',
    maxHeight: showSuggestions ? '320px' : '0',
    overflow: 'auto',
    transition: 'max-height 0.3s ease',
    borderTop: '1px solid #f0f0f0',
    marginBottom: '8px',
  };

  const suggestionChipStyle = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    padding: '8px 12px',
    margin: '4px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 8px rgba(255, 107, 157, 0.3)',
  };

  const suggestionHeaderStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const aiContextStyle = {
    fontSize: '10px',
    color: '#999',
    fontStyle: 'italic',
    marginBottom: '4px',
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    color: '#666',
  };

  const dateHeaderStyle = {
    textAlign: 'center',
    margin: '20px 0 10px',
    color: '#666',
    fontSize: '12px',
    fontWeight: '600',
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={chatContainerStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={userInfoStyle}>
            {chatUser.profilePic && (
              <img 
                src={chatUser.profilePic} 
                alt={chatUser.name}
                style={avatarStyle}
              />
            )}
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{chatUser.name}</h3>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {chatUser.interests?.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
          <button 
            style={closeButtonStyle} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={messagesContainerStyle}>
          {isLoading ? (
            <div style={loadingStyle}>Loading messages...</div>
          ) : (
            <>
              {Object.keys(messageGroups).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  marginTop: '50px',
                  fontSize: '16px'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                  <p>Start your conversation with {chatUser.name}!</p>
                  <p style={{ fontSize: '14px', opacity: 0.7 }}>
                    Say hello and break the ice
                  </p>
                </div>
              ) : (
                Object.entries(messageGroups).map(([date, dateMessages]) => (
                  <div key={date}>
                    <div style={dateHeaderStyle}>{date}</div>
                    {dateMessages.map((message) => (
                      <div key={message.id} style={messageStyle(message.sender === currentUser)}>
                        <div style={messageBubbleStyle(message.sender === currentUser)}>
                          <div>{message.content}</div>
                          <div style={messageTimeStyle}>
                            {formatTime(message.timestamp)}
                            {renderMessageStatus(message, message.sender === currentUser)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Advanced AI Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={suggestionsContainerStyle}>
            <div style={suggestionHeaderStyle}>
              🤖 Local AI Suggestions
              {aiContext && (
                <div style={aiContextStyle}>
                  {aiContext.ai_type === 'local_ollama' ? ' Online AI' : 'Offline AI'}
                </div>
              )}
            </div>
            <div>
              {suggestions.map((suggestion, index) => (
                <span
                  key={index}
                  style={suggestionChipStyle}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={inputContainerStyle}>
          <form style={inputFormStyle} onSubmit={sendMessage}>
            <button 
              type="button"
              style={suggestionButtonStyle}
              onClick={toggleSuggestions}
              title="Advanced AI Suggestions"
              disabled={suggestionsLoading}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {suggestionsLoading ? '⏳' : '🤖'}
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${chatUser.name}...`}
              style={messageInputStyle}
              onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <button 
              type="submit" 
              style={sendButtonStyle}
              disabled={!newMessage.trim()}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;