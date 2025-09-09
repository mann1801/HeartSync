import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WhoAreYouInterestedIn from './WhoAreYouInterestedIn';
import WhatAreYouLookingFor from './WhatAreYouLookingFor';
import DistancePreference from './DistancePref';
import EducationInput from './EducationInput';
import LifestyleHabits from './LifestyleHabits';
import WhatMakesYouYou from './WhatMakesYouYou';
import WhatAreYouInto from './WhatAreYouInto';
import ImageUpload from './ImageUpload';

// Shared styles for the signup form
const sharedStyles = {
  container: {
    maxWidth: 350,
    width: "100%",
    margin: "0 auto",
    padding: 28,
    borderRadius: 20,
    boxShadow: "0 4px 18px rgba(44, 19, 56, 0.13)",
    background: "#f8faff",
    fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    display: "block",
    marginBottom: 5,
    fontWeight: 600,
    color: "#6C2BD7",
    fontSize: 15,
  },
  input: {
    width: "100%",
    padding: "10px 10px",
    marginTop: 3,
    marginBottom: 14,
    border: "1.2px solid #e0e7ff",
    borderRadius: 8,
    fontSize: 15,
    background: "#f4f6fb",
    color: "#232323",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
    cursor: "text",
    boxShadow: "0 1px 2px rgba(44,19,56,0.02)",
  },
  button: {
    width: "100%",
    padding: "12px 0",
    background: "#7C3AED",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 700,
    marginTop: 14,
    cursor: "pointer",
    boxShadow: "0 2px 8px #e9e1fa",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  link: {
    color: "#7C3AED",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 500,
    display: "inline",
    transition: "color 0.2s",
  },
  linkRow: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
    color: "#232323",
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 0,
    textAlign: "center",
  },
};

// Enhanced dating app theme with modern design
const datingBgStyle = {
  minHeight: '100vh',
  width: '100vw',
  paddingTop: '80px', // Add minimal top padding to avoid navbar overlap
  paddingBottom: '40px', // Add bottom padding to prevent bottom cutoff
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
  borderRadius: 32,
  boxShadow: `
    0 20px 60px rgba(255, 107, 157, 0.2),
    0 8px 32px rgba(245, 87, 108, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8)
  `,
  padding: 50,
  maxWidth: 600,
  width: '100%',
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
  marginBottom: 32,
  fontWeight: 800,
  fontSize: 32,
  letterSpacing: -0.5,
  position: 'relative',
};

const datingSubtitleStyle = {
  textAlign: 'center',
  color: '#6c757d',
  fontSize: 16,
  marginBottom: 32,
  fontWeight: 400,
  lineHeight: 1.5,
};

const datingInputStyle = {
  width: '100%',
  padding: '16px 20px',
  marginTop: 8,
  marginBottom: 20,
  border: '2px solid rgba(255, 107, 157, 0.2)',
  borderRadius: 16,
  fontSize: 16,
  background: 'rgba(255, 255, 255, 0.8)',
  color: '#2d3748',
  outline: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box',
  boxShadow: '0 2px 8px rgba(255, 107, 157, 0.1)',
  backdropFilter: 'blur(10px)',
};

const getInputStyle = (fieldName, touched, fieldErrors) => {
  const baseStyle = { ...datingInputStyle };
  
  if (touched[fieldName]) {
    if (fieldErrors[fieldName]) {
      // Error state
      baseStyle.border = '2px solid #e53e3e';
      baseStyle.boxShadow = '0 0 0 4px rgba(229, 62, 62, 0.1)';
    } else {
      // Success state
      baseStyle.border = '2px solid #38a169';
      baseStyle.boxShadow = '0 0 0 4px rgba(56, 161, 105, 0.1)';
    }
  }
  
  return baseStyle;
};

const datingLabelStyle = {
  display: 'block',
  marginBottom: 8,
  fontWeight: 600,
  color: '#2d3748',
  fontSize: 16,
  letterSpacing: -0.2,
};

const datingBtnStyle = {
  width: '100%',
  padding: '18px 24px',
  background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 16,
  fontSize: 18,
  fontWeight: 700,
  marginTop: 24,
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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    email: "",
    password: "",
    gender: "",
    interestedIn: "",
    lookingFor: "",
    distance: 80,
    education: "",
    lifestyle: [],
    personality:[],
    interests: [],
    images: []
  });
  
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    userid: "",
    email: "",
    password: "",
    gender: ""
  });
  const [touched, setTouched] = useState({
    name: false,
    userid: false,
    email: false,
    password: false,
    gender: false
  });
  
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/journal";

  useEffect(() => {
    const originalOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = originalOverflowX;
    };
  }, []);

 
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateUsername = (userid) => {
    if (!userid.trim()) {
      return "Username is required";
    }
    if (userid.trim().length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (userid.trim().length > 20) {
      return "Username must be less than 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(userid.trim())) {
      return "Username can only contain letters, numbers, and underscores";
    }
    if (!/^[a-zA-Z]/.test(userid.trim())) {
      return "Username must start with a letter";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (email.trim().length > 100) {
      return "Email must be less than 100 characters";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (password.length > 128) {
      return "Password must be less than 128 characters";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password must contain at least one special character (@$!%*?&)";
    }
    return "";
  };

  const validateGender = (gender) => {
    if (!gender) {
      return "Please select your gender";
    }
    const validGenders = ["Men", "Women", "Beyond binary", "Everyone"];
    if (!validGenders.includes(gender)) {
      return "Please select a valid gender option";
    }
    return "";
  };

  const getPasswordValidationDetails = (password) => {
    if (!password) return {
      length: { valid: false, message: "At least 8 characters long" },
      lowercase: { valid: false, message: "At least one lowercase letter (a-z)" },
      uppercase: { valid: false, message: "At least one uppercase letter (A-Z)" },
      number: { valid: false, message: "At least one number (0-9)" },
      special: { valid: false, message: "At least one special character (@$!%*?&)" }
    };

    return {
      length: { 
        valid: password.length >= 8, 
        message: "At least 8 characters long" 
      },
      lowercase: { 
        valid: /(?=.*[a-z])/.test(password), 
        message: "At least one lowercase letter (a-z)" 
      },
      uppercase: { 
        valid: /(?=.*[A-Z])/.test(password), 
        message: "At least one uppercase letter (A-Z)" 
      },
      number: { 
        valid: /(?=.*\d)/.test(password), 
        message: "At least one number (0-9)" 
      },
      special: { 
        valid: /(?=.*[@$!%*?&])/.test(password), 
        message: "At least one special character (@$!%*?&)" 
      }
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear general error when user starts typing
    if (error) {
      setError("");
    }
    
    
    if (touched[name]) {
      let fieldError = "";
      switch (name) {
        case "name":
          fieldError = validateName(value);
          break;
        case "userid":
          fieldError = validateUsername(value);
          break;
        case "email":
          fieldError = validateEmail(value);
          break;
        case "password":
          fieldError = validatePassword(value);
          break;
        case "gender":
          fieldError = validateGender(value);
          break;
        default:
          break;
      }
      setFieldErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
   
    let fieldError = "";
    switch (name) {
      case "name":
        fieldError = validateName(value);
        break;
      case "userid":
        fieldError = validateUsername(value);
        break;
      case "email":
        fieldError = validateEmail(value);
        break;
      case "password":
        fieldError = validatePassword(value);
        break;
      case "gender":
        fieldError = validateGender(value);
        break;
      default:
        break;
    }
    setFieldErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const useridError = validateUsername(formData.userid);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const genderError = validateGender(formData.gender);

    const newFieldErrors = {
      name: nameError,
      userid: useridError,
      email: emailError,
      password: passwordError,
      gender: genderError
    };

    setFieldErrors(newFieldErrors);
    setTouched({
      name: true,
      userid: true,
      email: true,
      password: true,
      gender: true
    });

    // Check if there are any errors
    const hasErrors = Object.values(newFieldErrors).some(error => error !== "");
    return !hasErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      setError("Please fix the errors above before continuing.");
      return;
    }

    // If validation passes, proceed to next step
    setError("");
    setStep(2);
  };

  const submitAllData = async (finalData) => {
    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("userid", formData.userid);
        sessionStorage.setItem("token", data.token || ""); // Optional, based on backend
        alert("Signup Successful!");
        navigate("/match");
        // navigate(from, { replace: true });
      } else {
        setError(data.error || "Signup failed");
        setStep(1);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
      setStep(1);
    }
  };
  const handleNextStep = (newData, nextStep) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep(nextStep);
  };
  

  return (
    <div>
      {step === 1 && (
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
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '24px', color: 'white' }}>💕</span>
          </div>
          <h2 style={datingTitleStyle}>Find Your Perfect Match</h2>
          <p style={datingSubtitleStyle}>
            Join thousands of people discovering meaningful connections
          </p>
          {error && <div style={datingErrorStyle}>{error}</div>}
          <form onSubmit={handleFormSubmit} noValidate style={{ width: '100%' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={datingLabelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getInputStyle('name', touched, fieldErrors)}
                    className="dating-input"
                    autoComplete="name"
                    placeholder="Enter your full name"
                  />
                  <span style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.name && !fieldErrors.name ? '#38a169' : '#ff6b9d',
                    fontSize: '18px',
                  }}>{touched.name && !fieldErrors.name ? '' : ''}</span>
                  {touched.name && fieldErrors.name && (
                    <div style={{
                      color: '#e53e3e',
                      fontSize: '12px',
                      marginTop: '4px',
                      marginBottom: '8px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span></span>
                      {fieldErrors.name}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label style={datingLabelStyle}>Username</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="userid"
                    value={formData.userid}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getInputStyle('userid', touched, fieldErrors)}
                    className="dating-input"
                    autoComplete="username"
                    placeholder="Choose a unique username"
                  />
                  <span style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.userid && !fieldErrors.userid ? '#38a169' : '#ff6b9d',
                    fontSize: '18px',
                  }}>{touched.userid && !fieldErrors.userid ? '' : ''}</span>
                  {touched.userid && fieldErrors.userid && (
                    <div style={{
                      color: '#e53e3e',
                      fontSize: '12px',
                      marginTop: '4px',
                      marginBottom: '8px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span></span>
                      {fieldErrors.userid}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={datingLabelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getInputStyle('email', touched, fieldErrors)}
                    className="dating-input"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                  />
                  <span style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.email && !fieldErrors.email ? '#38a169' : '#ff6b9d',
                    fontSize: '18px',
                  }}>{touched.email && !fieldErrors.email ? '' : ''}</span>
                  {touched.email && fieldErrors.email && (
                    <div style={{
                      color: '#e53e3e',
                      fontSize: '12px',
                      marginTop: '4px',
                      marginBottom: '8px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span></span>
                      {fieldErrors.email}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label style={datingLabelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={getInputStyle('password', touched, fieldErrors)}
                    className="dating-input"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                  />
                  <span style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.password && !fieldErrors.password ? '#38a169' : '#ff6b9d',
                    fontSize: '18px',
                  }}>{touched.password && !fieldErrors.password ? '' : ''}</span>
                  
                 
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(255, 107, 157, 0.05)',
                    border: '1px solid rgba(255, 107, 157, 0.2)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#ff6b9d',
                      fontSize: '13px'
                    }}>
                      Password Requirements:
                    </div>
                    {Object.entries(getPasswordValidationDetails(formData.password)).map(([key, validation]) => (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px',
                          opacity: validation.valid ? 0.6 : 1,
                          textDecoration: validation.valid ? 'line-through' : 'none',
                          color: validation.valid ? '#38a169' : '#e53e3e',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>
                          {validation.valid ? '✅' : '❌'}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: validation.valid ? '400' : '500'
                        }}>
                          {validation.message}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {touched.password && fieldErrors.password && (
                    <div style={{
                      color: '#e53e3e',
                      fontSize: '12px',
                      marginTop: '8px',
                      marginBottom: '8px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span></span>
                      {fieldErrors.password}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={datingLabelStyle}>Gender</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...datingInputStyle,
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ff6b9d%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '12px auto',
                    paddingRight: '48px'
                  }}
                  className="dating-input"
                >
                  <option value="">Select your gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Beyond binary">Beyond binary</option>
                  <option value="Everyone">Everyone</option>
                </select>
                <span style={{
                  position: 'absolute',
                  right: '48px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#ff6b9d',
                  fontSize: '18px',
                  pointerEvents: 'none'
                }}></span>
                {touched.gender && fieldErrors.gender && <p style={sharedStyles.error}>{fieldErrors.gender}</p>}
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '24px' 
            }}>
              <button type="submit" style={{
                ...datingBtnStyle,
                maxWidth: '300px',
                width: '100%',
              }} className="dating-btn">
                💕 Create Account
              </button>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <span style={{ color: '#6c757d' }}>Already have an account?{' '}</span>
              <span
                style={datingLinkStyle}
                className="dating-link"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </div>
          </form>
        </div>
      </div>
      )}
      {step === 2 && (
      <WhoAreYouInterestedIn
        onNext={(value) => handleNextStep({ interestedIn: value }, 3)}
      />
    )}

    {step === 3 && (
      <WhatAreYouLookingFor
        onNext={(value) => handleNextStep({ lookingFor: value }, 4)}
      />
    
    )}

    {step === 4 && (
      <DistancePreference
        onNext={(distanceValue) => handleNextStep({ distance: distanceValue }, 5)}
      />
    )}

    {step === 5 && (
      <EducationInput
        onNext={(value) => handleNextStep({ education: value }, 6)}
      />
    
    )}

    {step === 6 && (
      <LifestyleHabits
        onNext={(values) => handleNextStep({ lifestyle: values }, 7)}
      />
    )}

    {step === 7 && (
      <WhatMakesYouYou
        onNext={(values) => handleNextStep({ personality: values }, 8)}
      />
    )}

    {step === 8 && (
      <WhatAreYouInto
        onNext={(values) => handleNextStep({ interests: values.interests }, 9)}
      />    
    )}

    {step === 9 && (
      <ImageUpload
        onNext={(images) => {
          const finalData = { ...formData, images: images };
          setFormData(finalData);
          submitAllData(finalData);
        }}
      />
    )}
    </div>
  );
};

export default Signup;