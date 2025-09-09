import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUsers, FaStar, FaArrowRight, FaUser, FaCog, FaBell } from 'react-icons/fa';

export default function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalMatches: 0,
    newMatches: 0,
    profileViews: 0,
    messages: 0
  });
  const [recentMatches, setRecentMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = sessionStorage.getItem('userid');
    if (!userid) {
      navigate('/login');
      return;
    }

    // Fetch user stats and recent matches
    const fetchDashboardData = async () => {
      try {
        // Fetch user matches
        const matchesResponse = await fetch('http://localhost:8000/api/get_user_matches/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userid })
        });
        
        const matchesData = await matchesResponse.json();
        const matches = matchesData.matches || [];
        
        setRecentMatches(matches.slice(0, 3)); // Show last 3 matches
        setUserStats({
          totalMatches: matches.length,
          newMatches: matches.filter(m => m.isNew).length,
          profileViews: Math.floor(Math.random() * 50) + 10, // Mock data
          messages: Math.floor(Math.random() * 20) + 5 // Mock data
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
            Welcome back! 💕
          </h1>
          <p className="text-gray-300 text-lg">
            Here's what's happening with your dating journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Matches</p>
                <p className="text-3xl font-bold text-white">{userStats.totalMatches}</p>
              </div>
              <FaHeart className="text-2xl text-pink-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Matches</p>
                <p className="text-3xl font-bold text-white">{userStats.newMatches}</p>
              </div>
              <FaUsers className="text-2xl text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-3xl font-bold text-white">{userStats.profileViews}</p>
              </div>
              <FaUser className="text-2xl text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Messages</p>
                <p className="text-3xl font-bold text-white">{userStats.messages}</p>
              </div>
              <FaBell className="text-2xl text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/match')}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-3">
                  <FaHeart />
                  <span>Discover New Matches</span>
                </span>
                <FaArrowRight />
              </button>
              
              <button
                onClick={() => navigate('/mymatches')}
                className="w-full flex items-center justify-between p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center space-x-3">
                  <FaUsers />
                  <span>View My Matches</span>
                </span>
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Matches</h3>
            {recentMatches.length > 0 ? (
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                      <FaHeart className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{match.name}</p>
                      <p className="text-gray-400 text-sm">
                        {match.interests?.slice(0, 2).join(', ')}...
                      </p>
                    </div>
                    <FaStar className="text-yellow-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaHeart className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No matches yet. Start swiping to find your perfect match!</p>
                <button
                  onClick={() => navigate('/match')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  Start Discovering
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">💡 Dating Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">Be Authentic</h4>
              <p className="text-gray-300 text-sm">Show your true personality in your profile and conversations.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">Ask Questions</h4>
              <p className="text-gray-300 text-sm">Engage with your matches by asking thoughtful questions.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">Stay Safe</h4>
              <p className="text-gray-300 text-sm">Always meet in public places and trust your instincts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}