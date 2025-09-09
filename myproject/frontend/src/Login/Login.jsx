import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {     
  const [formData, setFormData] = useState({ userid: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";  

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { userid, password } = formData;

  if (!userid || !password) {
    setError("All fields are required.");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, password }),
    });

    const data = await res.json();

   if (res.ok) {
      setError("");
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userid", data.userid); // ✅ Add this line
      // alert("Login Successful!");
      
      navigate("/match");
      console.log("🧑 User ID:", sessionStorage.getItem("userid"));


      // ✅ Step: Check and save any pending journal
      // const pendingText = sessionStorage.getItem("pending_journal");
      // const pendingAnalysis = sessionStorage.getItem("pending_analysis");

    //  if (pendingText && pendingAnalysis) {
    //   try {
    //     console.log("💾 Auto-saving journal with:", {
    //       userid: data.userid,
    //       text: pendingText,
    //       analysis: JSON.parse(pendingAnalysis),
    //     });

    //     await fetch("http://localhost:8000/journal/save/", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${data.token}`,
    //       },
    //       body: JSON.stringify({
    //         userid: data.userid, // make sure to send userid here
    //         text: pendingText,
    //         analysis: JSON.parse(pendingAnalysis),
    //       }),
    //     });

    //     sessionStorage.removeItem("pending_journal");
    //     sessionStorage.removeItem("pending_analysis");
    //   } catch (saveError) {
    //     console.error("❌ Failed to auto-save journal after login:", saveError);
    //   }
    // }


      // ✅ Redirect back to where user came from
      // navigate(from, { replace: true });
    } else {
      setError(data.error || "Login failed");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
  }
  };

  // Enhanced dating app theme with modern design
  const datingBgStyle = {
    minHeight: '100vh',
    width: '100vw',
    paddingTop: '80px', // Add minimal top padding to avoid navbar overlap
    background: `
      linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
      radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(240, 147, 251, 0.2) 0%, transparent 50%)
    `,
    backgroundSize: '400% 400%, 100% 100%, 100% 100%, 100% 100%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    overflow: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
  };

  const datingCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    boxShadow: `
      0 20px 60px rgba(255, 107, 157, 0.2),
      0 8px 32px rgba(245, 87, 108, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    padding: 30,
    maxWidth: 450,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'translateY(0)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const datingTitleStyle = {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 16,
    fontWeight: 800,
    fontSize: 24,
    letterSpacing: -0.5,
    position: 'relative',
  };

  const datingSubtitleStyle = {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 400,
    lineHeight: 1.4,
  };

  const datingInputStyle = {
    width: '100%',
    padding: '12px 16px',
    marginTop: 4,
    marginBottom: 12,
    border: '2px solid rgba(255, 107, 157, 0.2)',
    borderRadius: 12,
    fontSize: 14,
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#2d3748',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(255, 107, 157, 0.1)',
    backdropFilter: 'blur(10px)',
  };

  const datingLabelStyle = {
    display: 'block',
    marginBottom: 4,
    fontWeight: 600,
    color: '#2d3748',
    fontSize: 14,
    letterSpacing: -0.2,
  };

  const datingBtnStyle = {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 16,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(255, 107, 157, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: 0.5,
    position: 'relative',
    overflow: 'hidden',
  };

  const datingErrorStyle = {
    color: '#e53e3e',
    fontSize: 14,
    marginBottom: 16,
    marginTop: 0,
    fontWeight: 500,
    textAlign: 'center',
    padding: '12px 16px',
    background: 'rgba(229, 62, 62, 0.1)',
    borderRadius: 12,
    border: '1px solid rgba(229, 62, 62, 0.2)',
  };

  const datingLinkStyle = {
    color: '#ff6b9d',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    borderBottom: '2px solid transparent',
  };

  // Floating hearts background styles
  const floatingHeartsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const heartStyle = {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.1)',
    fontSize: '20px',
    animation: 'float 6s ease-in-out infinite',
  };

  // CSS animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes gradientShift {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .dating-card:hover {
      transform: translateY(-8px);
      box-shadow: 
        0 25px 80px rgba(255, 107, 157, 0.25),
        0 12px 40px rgba(245, 87, 108, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }
    
    .dating-input:focus {
      border-color: #ff6b9d;
      box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1);
      transform: translateY(-2px);
    }
    
    .dating-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(255, 107, 157, 0.4);
    }
    
    .dating-btn:active {
      transform: translateY(0);
    }
    
    .dating-link:hover {
      border-bottom-color: #ff6b9d;
    }
  `;
  document.head.appendChild(styleSheet);

  return (
    <div style={datingBgStyle}>
      {/* Floating hearts background */}
      <div style={floatingHeartsStyle}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              ...heartStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      <div style={datingCardStyle} className="dating-card">
        <div style={{
          width: '45px',
          height: '45px',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '18px', color: 'white' }}>💕</span>
        </div>
        <h2 style={datingTitleStyle}>Welcome Back</h2>
        <p style={datingSubtitleStyle}>
          Sign in to continue your journey to find love
        </p>
        {error && (
          <div style={datingErrorStyle}>{error}</div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
          <div style={{ marginBottom: 12 }}>
            <label style={datingLabelStyle} htmlFor="userid">Username or Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="userid"
                id="userid"
                placeholder="Enter your username or email"
                value={formData.userid}
                onChange={handleChange}
                style={datingInputStyle}
                className="dating-input"
                autoComplete="off"
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#ff6b9d',
                fontSize: '16px',
              }}>👤</span>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={datingLabelStyle} htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={datingInputStyle}
                className="dating-input"
                autoComplete="off"
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#ff6b9d',
                fontSize: '16px',
              }}>🔒</span>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '16px' 
          }}>
            <button type="submit" style={{
              ...datingBtnStyle,
              maxWidth: '280px',
              width: '100%',
            }} className="dating-btn">
              💕 Sign In
            </button>
          </div>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ color: '#6c757d', fontSize: '14px' }}>New user?{' '}</span>
          <span
            style={{...datingLinkStyle, fontSize: '14px'}}
            className="dating-link"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;