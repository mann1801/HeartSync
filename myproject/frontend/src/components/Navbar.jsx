import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHeart, FaUser, FaSignOutAlt, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userid = sessionStorage.getItem('userid');
    setIsLoggedIn(!!userid);
    setUsername(userid || '');

    // Fetch unread message count if logged in
    if (userid) {
      fetchUnreadMessageCount(userid);
    }

    // Listen for custom event to refresh message count
    const handleMessageCountUpdate = () => {
      if (userid) {
        fetchUnreadMessageCount(userid);
      }
    };

    window.addEventListener('messageCountUpdate', handleMessageCountUpdate);

    return () => {
      window.removeEventListener('messageCountUpdate', handleMessageCountUpdate);
    };
  }, [location]);

  const fetchUnreadMessageCount = async (userid) => {
    try {
      const response = await fetch('http://localhost:8000/api/get_unread_message_count/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid })
      });
      const data = await response.json();
      console.log('🔍 Navbar received unread count:', data.unread_count);
      setUnreadMessageCount(data.unread_count || 0);
    } catch (error) {
      console.error('Error fetching unread message count:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');

    toast.info("👋 Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      style: {
        background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
        color: "white",
        borderRadius: "16px",
        fontSize: "16px",
        fontWeight: "600",
      },
    });

    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 no-underline hover:no-underline">
            <FaHeart className="text-2xl text-pink-400 animate-pulse" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              HeartSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className={`text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/') ? 'text-pink-400 font-semibold' : ''
                }`}
            >
              Home
            </button>
            {isLoggedIn ? (
              <>
                <Link
                  to="/match"
                  className={`no-underline hover:no-underline text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/match') ? 'text-pink-400 font-semibold' : ''
                    }`}
                >
                  Discover
                </Link>
                <Link
                  to="/mymatches"
                  className={`no-underline hover:no-underline text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/mymatches') ? 'text-pink-400 font-semibold' : ''
                    }`}
                >
                  My Matches
                </Link>
                <Link
                  to="/profile"
                  className={`no-underline hover:no-underline text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/profile') ? 'text-pink-400 font-semibold' : ''
                    }`}
                >
                  Profile
                </Link>
                <Link
                  to="/messages"
                  className={`relative no-underline hover:no-underline text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/messages') ? 'text-pink-400 font-semibold' : ''
                    }`}
                >
                  <div className="flex items-center space-x-1">
                    <FaEnvelope />
                    <span>Messages</span>
                  </div>
                  {unreadMessageCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {unreadMessageCount}
                    </div>
                  )}
                </Link>
                <Link
                  to="/contact"
                  className={`no-underline hover:no-underline text-white hover:text-pink-400 transition-colors duration-300 ${isActive('/contact') ? 'text-pink-400 font-semibold' : ''
                    }`}
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const features = document.getElementById('features');
                      if (features) {
                        features.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-white hover:text-pink-400 transition-colors duration-300"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const testimonials = document.getElementById('testimonials');
                      if (testimonials) {
                        testimonials.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-white hover:text-pink-400 transition-colors duration-300"
                >
                  Success Stories
                </button>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const footer = document.getElementById('download');
                      if (footer) {
                        footer.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="text-white hover:text-pink-400 transition-colors duration-300"
                >
                  Download App
                </button>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 text-white hover:text-pink-400 transition-colors duration-300"
                  aria-label="Open Profile"
                >
                  <FaUser className="text-pink-400" />
                  <span className="text-sm font-medium">{username}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-white hover:text-pink-400 transition-colors duration-300"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="no-underline hover:no-underline px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="no-underline hover:no-underline px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Join for Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-pink-400 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                  }`}
              >
                Home
              </button>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/match"
                    className={`no-underline hover:no-underline block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/match') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Discover
                  </Link>
                  <Link
                    to="/mymatches"
                    className={`no-underline hover:no-underline block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/mymatches') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Matches
                  </Link>
                  <Link
                    to="/profile"
                    className={`no-underline hover:no-underline block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/profile') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/messages"
                    className={`relative no-underline hover:no-underline block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/messages') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <FaEnvelope />
                      <span>Messages</span>
                      {unreadMessageCount > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {unreadMessageCount}
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link
                    to="/contact"
                    className={`no-underline hover:no-underline block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/contact') ? 'text-pink-400 bg-white/10' : 'text-white hover:text-pink-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/');
                      setTimeout(() => {
                        const features = document.getElementById('features');
                        if (features) {
                          features.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/');
                      setTimeout(() => {
                        const testimonials = document.getElementById('testimonials');
                        if (testimonials) {
                          testimonials.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    Success Stories
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/');
                      setTimeout(() => {
                        const footer = document.getElementById('download');
                        if (footer) {
                          footer.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    Download App
                  </button>
                </>
              )}
              {isLoggedIn ? (
                <div className="px-3 py-2">
                  <button
                    onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                    className="flex items-center space-x-2 text-white mb-2 hover:text-pink-400 transition-colors duration-300"
                    aria-label="Open Profile"
                  >
                    <FaUser className="text-pink-400" />
                    <span className="text-sm font-medium">{username}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-pink-400 transition-colors duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 font-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white transition-all duration-300 font-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join for Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}