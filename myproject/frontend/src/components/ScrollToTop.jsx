import React, { useState, useEffect } from 'react';

const ScrollToTop = ({ 
  targetRef, 
  threshold = 200, 
  position = 'bottom-right',
  size = 'medium',
  color = 'pink',
  icon = '↑',
  showText = false,
  text = 'Top',
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef?.current) {
        const { scrollTop } = targetRef.current;
        setIsVisible(scrollTop > threshold);
      } else {
        // If no targetRef provided, use window scroll
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > threshold);
      }
    };

    const target = targetRef?.current || window;
    target.addEventListener('scroll', handleScroll);
    
    return () => target.removeEventListener('scroll', handleScroll);
  }, [targetRef, threshold]);

  const scrollToTop = () => {
    if (targetRef?.current) {
      targetRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If no targetRef provided, scroll window
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Position styles
  const getPositionStyle = () => {
    const baseStyle = {
      position: 'fixed',
      zIndex: 1000,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      pointerEvents: isVisible ? 'auto' : 'none',
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyle, top: '20px', left: '20px' };
      case 'top-right':
        return { ...baseStyle, top: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyle, bottom: '20px', left: '20px' };
      case 'bottom-right':
      default:
        return { ...baseStyle, bottom: '20px', right: '20px' };
    }
  };

  // Size styles
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: '40px', height: '40px', fontSize: '16px' };
      case 'large':
        return { width: '60px', height: '60px', fontSize: '24px' };
      case 'medium':
      default:
        return { width: '50px', height: '50px', fontSize: '20px' };
    }
  };

  // Color styles
  const getColorStyle = () => {
    switch (color) {
      case 'blue':
        return {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)'
        };
      case 'green':
        return {
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          boxShadow: '0 4px 12px rgba(67, 233, 123, 0.4)'
        };
      case 'purple':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
        };
      case 'orange':
        return {
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          boxShadow: '0 4px 12px rgba(250, 112, 154, 0.4)'
        };
      case 'pink':
      default:
        return {
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
          boxShadow: '0 4px 12px rgba(255, 107, 157, 0.4)'
        };
    }
  };

  const buttonStyle = {
    ...getPositionStyle(),
    ...getSizeStyle(),
    ...getColorStyle(),
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    ...style
  };

  return (
    <button
      className={`scroll-to-top-btn ${className}`}
      style={buttonStyle}
      onClick={scrollToTop}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1) translateY(0)';
        e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1) translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 157, 0.4)';
      }}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      {showText ? (
        <div style={{ textAlign: 'center', lineHeight: '1' }}>
          <div style={{ fontSize: '14px' }}>{icon}</div>
          <div style={{ fontSize: '10px', marginTop: '2px' }}>{text}</div>
        </div>
      ) : (
        icon
      )}
    </button>
  );
};

export default ScrollToTop;