import React, { useState, useEffect } from 'react';
import { FaHeart, FaUsers, FaShieldAlt, FaStar, FaArrowRight, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0); // which slide to show
  const [newReview, setNewReview] = useState({ text: '', rating: 5 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Load reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/?page=1&page_size=50`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.results || []);
          setHasMore(data.results && data.results.length < data.total);
        }
      } catch (e) {
        console.error('Failed to load reviews', e);
      }
    };
    fetchReviews();
  }, []);

  const features = [
    {
      icon: <FaHeart className="text-5xl text-pink-400" />,
      title: "Smart Matching",
      description: "Our AI-powered algorithm finds your perfect match based on compatibility, interests, and values.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <FaUsers className="text-5xl text-blue-400" />,
      title: "Verified Profiles",
      description: "All profiles are verified to ensure you're connecting with real people who share your interests.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-400" />,
      title: "Safe & Secure",
      description: "Your privacy and security are our top priorities with end-to-end encryption and privacy controls.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Mike",
      text: "We found each other on HeartSync and got married last year! The matching was perfect.",
      rating: 5,
      avatar: "👫"
    },
    {
      name: "Alex & Emma",
      text: "The matching algorithm is incredible. We clicked instantly and have been together for 2 years!",
      rating: 5,
      avatar: "💑"
    },
    {
      name: "David & Lisa",
      text: "Finally found someone who shares my passion for hiking and travel. Thank you HeartSync!",
      rating: 5,
      avatar: "🏔️"
    }
  ];

  const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "500K+", label: "Successful Matches" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white overflow-x-hidden pt-16">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>



      {/* Hero Section */}
      <section id="home" className={`relative z-10 px-8 py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Find Your Perfect Match 💖
            </h1>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience the thrill of finding your perfect match with our innovative dating app.
              Connect with people who share your values, interests, and dreams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => {
                const userid = sessionStorage.getItem('userid');
                if (userid) {
                  navigate('/match');
                } else {
                  navigate('/signup');
                }
              }}
              className="group px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 font-semibold flex items-center gap-3"
            >
              Start Dating Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Why Choose HeartSync?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/20 ${activeFeature === index ? 'ring-2 ring-pink-400 shadow-2xl' : ''
                  }`}
              >
                <div className="text-center mb-6">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 mb-4">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="relative z-10 py-20 px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Success Stories
          </h2>
          {/* User Reviews Carousel */}
          <div className="relative">
            <button
              aria-label="Previous reviews"
              onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
              className="hidden md:flex items-center justify-center absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 z-20"
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next reviews"
              onClick={() => setCarouselIndex((prev) => Math.min(Math.max(0, reviews.length - 3), prev + 1))}
              className="hidden md:flex items-center justify-center absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 z-20"
            >
              <FaChevronRight />
            </button>
            <div className="grid md:grid-cols-3 gap-8 px-6 md:px-12">
              {reviews.length === 0 && (
                <div className="col-span-3 text-center text-gray-300">No reviews yet. Be the first to share your story!</div>
              )}
              {reviews.slice(carouselIndex, carouselIndex + 3).map((r) => (
                <div key={r.id} className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex justify-center mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center italic mb-4">"{r.text}"</p>
                  <p className="text-pink-400 text-center font-semibold">- {r.name || r.userid}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Review - only for logged in users */}
          <div className="mt-12 p-6 rounded-2xl bg-white/10 border border-white/20">
            {sessionStorage.getItem('userid') ? (
              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const userid = sessionStorage.getItem('userid');
                  if (!userid) return;
                  try {
                    const res = await fetch('http://localhost:8000/api/reviews/create/', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userid, text: newReview.text, rating: newReview.rating })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setNewReview({ text: '', rating: 5 });
                      // refresh
                      const rres = await fetch(`http://localhost:8000/api/reviews/?page=1&page_size=50`);
                      const rdata = await rres.json();
                      if (rres.ok) setReviews(rdata.results || []);
                    } else {
                      alert(data.error || 'Failed to submit review');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Something went wrong');
                  }
                }}
              >
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      value={newReview.text}
                      onChange={(e) => setNewReview((s) => ({ ...s, text: e.target.value }))}
                      placeholder="Write your review..."
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview((s) => ({ ...s, rating: Number(e.target.value) }))}
                      className="w-full px-3 py-3 rounded-xl bg-black/30 border border-white/20 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} ⭐</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                                         <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-base">Submit review</button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center text-gray-300">Login to share your review.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
