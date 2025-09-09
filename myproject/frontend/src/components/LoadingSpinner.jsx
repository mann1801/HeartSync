import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <FaHeart className="text-6xl text-pink-400 animate-pulse mb-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-white text-xl font-medium">{message}</p>
      </div>
    </div>
  );
}
