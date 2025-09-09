import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';


function MatchCardStack() {
  const [matches, setMatches] = useState([]);
  const [topIndex, setTopIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateOut, setAnimateOut] = useState(null);
  const [matchUser, setMatchUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const userid = sessionStorage.getItem('userid');

    // Fetch matches
    fetch('http://localhost:8000/api/get_matches/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid })
    })
      .then(res => res.json())
      .then(data => {
        if (data.matches) {
          setMatches(data.matches);
          setTopIndex(0);
        }
      })
      .catch(err => console.error("❌ Error fetching matches:", err));

    // Fetch unread matches count
    fetch('http://localhost:8000/api/get_unread_matches_count/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid })
    })
      .then(res => res.json())
      .then(data => {
        setUnreadCount(data.unread_count || 0);
      })
      .catch(err => console.error("❌ Error fetching unread count:", err));
  }, []);

  // Add keyframe animations to head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeZoomIn {
        0% { transform: scale(0.5); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
        50% { background-position: 100% 50%, 100% 100%, 100% 100%, 100% 100%; }
        100% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const removeTopCard = () => {
    setIsAnimating(false);
    setAnimateOut(null);
    setSwipeDirection(null);
    setDragX(0);
    setIsDragging(false);
    setTopIndex(prev => prev + 1);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (isAnimating || topIndex >= matches.length) return;
      setIsDragging(true);
      setDragX(eventData.deltaX);
      if (eventData.deltaX > 40) setSwipeDirection('right');
      else if (eventData.deltaX < -40) setSwipeDirection('left');
      else setSwipeDirection(null);
    },
    onSwiped: (eventData) => {
      if (isAnimating || topIndex >= matches.length) return;
      setIsDragging(false);

      if (eventData.absX > 100) {
        const direction = eventData.deltaX > 0 ? 'right' : 'left';
        const action = direction === 'right' ? 'like' : 'nope';
        const swiper = sessionStorage.getItem('userid');
        const target = matches[topIndex].userid;

        // Save swipe and then check for match
        fetch('http://localhost:8000/api/save_swipe/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ swiper, target, action })
        })
          .then(() => {
            // Check for match only after swipe is saved
            if (action === 'like') {
              return fetch('http://localhost:8000/api/check_match/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user1: swiper, user2: target })
              });
            }
          })
          .then(res => res ? res.json() : null)
          .then(data => {
            if (data && data.match) {
              setMatchUser(matches[topIndex]); // show modal
              console.log('🎉 Match created!', matches[topIndex].name);
            }
          })
          .catch(err => {
            console.error('Error in swipe/match process:', err);
          });

        setAnimateOut(direction);
        setIsAnimating(true);
        setTimeout(removeTopCard, 300);
      } else {
        setDragX(0);
        setSwipeDirection(null);
      }
    },
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  const pageStyle = {
    minHeight: 'calc(100vh - 200px)', // Account for navbar and footer
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 40,
    paddingTop: 120, // Increased top padding to move card down
    paddingBottom: 40,
    background: `
      linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
      radial-gradient(circle at 30% 20%, rgba(255, 107, 157, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(79, 172, 254, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.2) 0%, transparent 70%)
    `,
    backgroundSize: '400% 400%, 100% 100%, 100% 100%, 100% 100%',
    animation: 'gradientShift 20s ease infinite',
    position: 'relative',
  };

  const cardWrapperStyle = {
    width: 800,
    height: 500,
    position: 'relative',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    overflowY: 'auto',
    width: '100%',
    height: '500px',
    touchAction: 'pan-y',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'transform 0.35s, box-shadow 0.25s',
  };

  const badgeStyle = {
    position: 'absolute',
    top: 20,
    left: swipeDirection === 'right' ? 20 : 'auto',
    right: swipeDirection === 'left' ? 20 : 'auto',
    fontSize: 30,
    fontWeight: 'bold',
    color: swipeDirection === 'right' ? '#27ae60' : '#e74c3c',
    backgroundColor: swipeDirection === 'right' ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)',
    border: `2px solid ${swipeDirection === 'right' ? '#27ae60' : '#e74c3c'}`,
    padding: '10px 20px',
    borderRadius: 10,
    zIndex: 999,
    opacity: swipeDirection ? 1 : 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: 20,
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
    textAlign: 'center',
    animation: 'fadeZoomIn 0.4s ease',
    color: '#000',
  };

  const closeBtnStyle = {
    backgroundColor: '#ff6b9d',
    border: 'none',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(255,107,157,0.3)',
  };

  const titleStyle = {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#c44569'
  };

  const sectionTitleStyle = {
    fontWeight: 700,
    marginTop: 18,
    color: '#ff6b9d',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  };

  const itemListStyle = {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.6,
  };

  return (
    <div style={pageStyle}>
      {/* Floating animated elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '60px',
        height: '60px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '40px',
        height: '40px',
        background: 'rgba(255, 107, 157, 0.2)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 107, 157, 0.3)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '20%',
        width: '50px',
        height: '50px',
        background: 'rgba(79, 172, 254, 0.2)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(79, 172, 254, 0.3)',
      }} />

      <div style={{ position: 'absolute', top: 90, right: 40 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => navigate('/mymatches')}
            style={{
              background: '#fff',
              color: '#c44569',
              fontWeight: 'bold',
              padding: '10px 16px',
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            💞 My Matches
          </button>
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ff4757',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(255, 71, 87, 0.4)',
              animation: 'pulse 2s infinite',
            }}>
              {unreadCount}
            </div>
          )}
        </div>
      </div>
             <div style={{
         display: 'flex',
         alignItems: 'center',
         gap: '40px',
         width: '100%',
         maxWidth: '1200px'
       }}>
                   {/* Left Side Panel */}
          <div style={{
            width: '200px',
            height: '500px',
            background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(79, 172, 254, 0.2) 100%)',
            borderRadius: '25px',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background elements */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              animation: 'float 4s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-15px',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 107, 157, 0.2)',
              borderRadius: '50%',
              animation: 'float 6s ease-in-out infinite reverse'
            }} />
            
            {/* Top content */}
            <div>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '15px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                animation: 'pulse 2s ease-in-out infinite'
              }}>💕</div>
              <h3 style={{ 
                fontSize: '20px', 
                marginBottom: '15px',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>Find Your Match</h3>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #ff6b9d, #4facfe)',
                borderRadius: '2px',
                margin: '0 auto 15px'
              }} />
            </div>

            {/* Middle content */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>💘</div>
              <p style={{ 
                fontSize: '13px', 
                opacity: 0.9,
                lineHeight: '1.4',
                fontWeight: '500'
              }}>
                Swipe right to like, left to pass. Your perfect match is waiting!
              </p>
            </div>

            {/* Bottom content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                fontSize: '20px'
              }}>
                <span style={{ animation: 'float 3s ease-in-out infinite' }}>❤️</span>
                <span style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>💙</span>
                <span style={{ animation: 'float 3s ease-in-out infinite 1s' }}>💚</span>
              </div>
              <div style={{
                fontSize: '12px',
                opacity: '0.7',
                fontWeight: '500'
              }}>
                Love is in the air
              </div>
            </div>
          </div>

         {/* Main Card Area */}
         <div style={cardWrapperStyle}>
           {matches.length === 0 || topIndex >= matches.length ? (
             <p style={{ color: '#fff', fontSize: 18 }}>Loading or no matches found</p>
           ) : (
          matches.map((person, index) => {
            if (index < topIndex) return null;
            const isTop = index === topIndex;
            const isNext = index === topIndex + 1;
            const zIndex = matches.length - index;
            let transform = 'none';
            let transition = cardStyle.transition;
            let boxShadow = cardStyle.boxShadow;
            let scale = 1;
            let offsetY = 0;

            if (isTop) {
              if (isAnimating && animateOut) {
                const outX = animateOut === 'right' ? 1000 : -1000;
                transform = `translateX(${outX}px) rotate(${outX / 15}deg)`;
              } else {
                transform = `translateX(${dragX}px) rotate(${dragX / 15}deg)`;
                boxShadow = isDragging ? '0 30px 80px rgba(0,0,0,0.18)' : cardStyle.boxShadow;
              }
            } else if (isNext) {
              scale = 0.96;
              offsetY = 18;
              transform = `scale(${scale}) translateY(${offsetY}px)`;
              transition = 'transform 0.35s ease';
              boxShadow = '0 10px 30px rgba(0,0,0,0.10)';
            }

            return (
              <div
                key={person.userid}
                style={{
                  ...cardStyle,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex,
                  transform,
                  transition,
                  boxShadow,
                }}
                {...(isTop ? handlers : {})}
              >
                {isTop && swipeDirection && (
                  <div style={badgeStyle}>
                    {swipeDirection === 'right' ? 'LIKE ❤️' : 'NOPE ❌'}
                  </div>
                )}
                {/* Left side - Profile Picture */}
                {person.profilePic && (
                  <div style={{
                    width: '45%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px'
                  }}>
                    <img
                      src={person.profilePic}
                      alt={`${person.name}'s profile`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '16px'
                      }}
                    />
                  </div>
                )}

                {/* Right side - Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={titleStyle}>{person.name}</h3>
                    <div>
                      <div style={sectionTitleStyle}>Interests</div>
                      <div style={itemListStyle}>{person.interests?.join(', ') || 'None'}</div>
                    </div>
                    <div>
                      <div style={sectionTitleStyle}>Lifestyle</div>
                      <div style={itemListStyle}>{person.lifestyle?.join(', ') || 'None'}</div>
                    </div>
                    <div>
                      <div style={sectionTitleStyle}>Personality</div>
                      <div style={itemListStyle}>{person.personality?.join(', ') || 'None'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 14, color: '#999' }}>
                    Swipe left to pass / right to like 💘
                  </div>
                </div>
              </div>
                         );
           })
         )}

         {matchUser && (
           <div style={modalOverlayStyle}>
             <div style={modalStyle}>
               <h2 style={{ fontSize: 32, marginBottom: 10 }}>💘 It's a Match!</h2>
               <p style={{ fontSize: 20, marginBottom: 20 }}>
                 You and <strong>{matchUser.name}</strong> like each other!
               </p>
               <button onClick={() => setMatchUser(null)} style={closeBtnStyle}>Close</button>
             </div>
           </div>
         )}
         </div>

                   {/* Right Side Panel */}
          <div style={{
            width: '200px',
            height: '500px',
            background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)',
            borderRadius: '25px',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background elements */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              width: '50px',
              height: '50px',
              background: 'rgba(79, 172, 254, 0.2)',
              borderRadius: '50%',
              animation: 'float 5s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '55px',
              height: '55px',
              background: 'rgba(240, 147, 251, 0.2)',
              borderRadius: '50%',
              animation: 'float 7s ease-in-out infinite reverse'
            }} />
            
            {/* Top content */}
            <div>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '15px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                animation: 'pulse 2s ease-in-out infinite'
              }}>🎯</div>
              <h3 style={{ 
                fontSize: '20px', 
                marginBottom: '15px',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>Your Stats</h3>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #4facfe, #f093fb)',
                borderRadius: '2px',
                margin: '0 auto 15px'
              }} />
            </div>

            {/* Middle content - Stats */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}>
              <div style={{ 
                fontSize: '14px', 
                opacity: 0.9,
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                <div style={{ 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>💕</span>
                  <span><strong>Matches:</strong> {matches.length}</span>
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>📋</span>
                  <span><strong>Remaining:</strong> {Math.max(0, matches.length - topIndex)}</span>
                </div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>💬</span>
                  <span><strong>Unread:</strong> {unreadCount}</span>
                </div>
              </div>
            </div>

            {/* Bottom content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                fontSize: '20px'
              }}>
                <span style={{ animation: 'float 3s ease-in-out infinite' }}>📊</span>
                <span style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>📈</span>
                <span style={{ animation: 'float 3s ease-in-out infinite 1s' }}>🎉</span>
              </div>
              <div style={{
                fontSize: '12px',
                opacity: '0.7',
                fontWeight: '500'
              }}>
                Keep swiping!
              </div>
            </div>
          </div>
       </div>
    </div>
  );
}

export default MatchCardStack;
