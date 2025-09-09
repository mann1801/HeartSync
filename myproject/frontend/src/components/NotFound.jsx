import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHome, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <FaHeart className="text-8xl text-pink-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaHome />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 text-gray-400">
          <p className="text-sm">Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
