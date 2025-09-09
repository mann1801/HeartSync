import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-6xl text-yellow-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-300 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page or go back home.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
          >
            Refresh Page
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaHome />
            Go Home
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="text-pink-400 cursor-pointer">Error Details (Development)</summary>
            <pre className="mt-2 text-xs text-gray-400 bg-black/20 p-4 rounded overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;
