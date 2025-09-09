// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaHeart, FaGraduationCap, FaMapMarkerAlt, FaUsers, FaBrain, FaDumbbell, FaPlus, FaMinus } from 'react-icons/fa';

// // Predefined categories
// const INTERESTS_CATEGORIES = {
//     'Creativity': ['Poetry', 'Sneakers', 'Freelancing', 'Photography', 'Choir', 'Cosplay', 'Content Creation', 'Vintage fashion', 'Investing', 'Singing', 'Language Exchange', 'Writing', 'Literature', 'NFTs', 'Tattoos', 'Painting', 'Upcycling', 'Entrepreneurship', 'Acapella', 'Musical Instrument', 'Musical Writing', 'Dancing', 'Exchange Program', 'Art', 'Real Estate', 'Drawing', 'Blogging', 'Fashion', 'DIY'],
//     'Social and content': ['Instagram', 'SoundCloud', 'Pinterest', 'Spotify', 'Social Media', 'Vlogging', 'YouTube', 'Virtual Reality', 'Memes', 'Metaverse', 'Podcasts', 'TikTok', 'Twitch', 'Netflix'],
//     'Sports and fitness': ['Freeletics', 'Cricket', 'Ice Hockey', 'Sports Shooting', 'Athletics', 'Sports', 'Walking', 'Beach sports', 'Fitness classes', 'Skating', 'Rugby', 'Boxing', 'Badminton', 'Pilates', 'Cheerleading', 'Pole Dancing', 'Car Racing', 'Motor Sports', 'Jogging', 'Football', 'Tennis', 'Skateboarding'],
//     'Music': ['Bhangra', 'K-Pop', 'Gospel music', 'Music bands', 'Rock music', 'Soul music', 'Pop music', 'Punk rock', 'Rap music', 'Folk music', 'Latin music', 'Alternative music', 'Techno', 'Jazz', 'House music', 'EDM', 'R&B', 'Indie music', 'Opera', 'Heavy Metal', 'Funk music', 'Reggaeton', 'Country Music', 'Hip Hop', 'J-Pop', 'Electronic Music', 'Grime', '90s Britpop', 'Trap Music'],
//     'Gaming': ['Ludo', 'PlayStation', 'E-Sports', 'Fortnite', 'Xbox', 'League of Legends', 'Nintendo', 'Among Us', 'Atari', 'Roblox'],
//     'Going out': ['Festivals', 'Stand up Comedy', 'Escape Rooms', 'Bars', 'Thrifting', 'Museums', 'Raves', 'Drive-in Cinema', 'Musical theater', 'Cafe hopping', 'Aquarium', 'Clubbing', 'Exhibition', 'Shopping', 'Cars', 'Pub Quiz', 'Happy hour', 'Karaoke', 'House Parties', 'Theater', 'Shisha', 'Rollerskating', 'Live Music', 'Bar Hopping', 'Bowling'],
//     'Outdoors and adventure': ['Road Trips', 'Rowing', 'Diving', 'Jetskiing'],
//     'Fan favorites': ['90s Kid', 'Comic-con', 'Harry Potter', 'NBA', 'WWE', 'Dungeons & Dragons', 'Meme', 'Marvel', 'Anime'],
//     'Movies and TV Shows': ['Action', 'Romance', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Documentaries', 'Bollywood', 'K-Drama', 'Crime Shows', 'Animated', 'Sitcoms', 'Reality TV'],
//     'Wellness': ['Yoga', 'Meditation', 'Journaling', 'Breathwork', 'Mindfulness', 'Therapy', 'Spa', 'Healthy Eating', 'Home Remedies', 'Fitness Tracker']
// };

// const LIFESTYLE_CATEGORIES = {
//     'Drinking': ['Not for me', 'Sober', 'Sober curious', 'On special occasions', 'Socially on weekends', 'Most Nights'],
//     'Smoking': ['Social smoker', 'Smoker when drinking', 'Non-smoker', 'Smoker', 'Trying to quit'],
//     'Fitness': ['Everyday', 'Often', 'Sometimes', 'Never'],
//     'Pets': ['Dog', 'Cat', 'Reptile', 'Amphibian', 'Bird', 'Fish', 'Don\'t have but love', 'Other', 'Turtle', 'Hamster', 'Rabbit', 'Pet-free', 'All the pets']
// };

// const PERSONALITY_CATEGORIES = {
//     'Communication': ['I stay on WhatsApp all day', 'Big time texter', 'Phone caller', 'Video chatter', 'I\'m slow to answer on WhatsApp', 'Bad texter', 'Better in person'],
//     'Love Languages': ['Thoughtful gestures', 'Presents', 'Touch', 'Compliments', 'Time together'],
//     'Education': ['Bachelors', 'In College', 'High School', 'PhD', 'In Grad School', 'Masters', 'Trade School'],
//     'Zodiac': ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
// };

// // Add keyframe animation for Profile background
// const addProfileAnimation = () => {
//     const style = document.createElement('style');
//     style.innerHTML = `
//     @keyframes profileGradient {
//       0% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
//       25% { background-position: 100% 50%, 100% 100%, 100% 100%, 100% 100%; }
//       50% { background-position: 100% 0%, 0% 100%, 100% 0%, 0% 100%; }
//       75% { background-position: 0% 100%, 100% 0%, 0% 100%, 100% 0%; }
//       100% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
//     }
//     @keyframes profileFloat {
//       0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
//       25% { transform: translateY(-10px) scale(1.05) rotate(90deg); }
//       50% { transform: translateY(-18px) scale(0.95) rotate(180deg); }
//       75% { transform: translateY(-6px) scale(1.02) rotate(270deg); }
//     }
//   `;
//     document.head.appendChild(style);
//     return style;
// };

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const navigate = useNavigate();

//     // Form state for editing
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         gender: '',
//         interestedIn: '',
//         lookingFor: '',
//         distance: 80,
//         education: '',
//         interests: [],
//         lifestyle: [],
//         personality: [],
//         images: []
//     });

//     useEffect(() => {
//         const userid = sessionStorage.getItem('userid');
//         if (!userid) {
//             navigate('/login');
//             return;
//         }
//         fetchUserProfile(userid);
//     }, [navigate]);

//     // Add background animation
//     useEffect(() => {
//         const style = addProfileAnimation();
//         return () => {
//             if (style && style.parentNode) {
//                 style.parentNode.removeChild(style);
//             }
//         };
//     }, []);

//     const fetchUserProfile = async (userid) => {
//         try {
//             const response = await fetch('http://localhost:8000/api/get_user_profile/', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userid })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.user);
//                 setFormData({
//                     name: data.user.name || '',
//                     email: data.user.email || '',
//                     gender: data.user.gender || '',
//                     interestedIn: data.user.interestedIn || '',
//                     lookingFor: data.user.lookingFor || '',
//                     distance: data.user.distance || 80,
//                     education: data.user.education || '',
//                     interests: data.user.interests || [],
//                     lifestyle: data.user.lifestyle || [],
//                     personality: data.user.personality || [],
//                     images: data.user.images || []
//                 });
//             } else {
//                 toast.error('Failed to load profile');
//             }
//         } catch (error) {
//             console.error('Error fetching profile:', error);
//             toast.error('Error loading profile');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleArrayChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     // Helper functions for category selection
//     const handleCategoryToggle = (field, category) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: prev[field].includes(category)
//                 ? prev[field].filter(item => item !== category)
//                 : [...prev[field], category]
//         }));
//     };

//     const handleCategoryRemove = (field, category) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: prev[field].filter(item => item !== category)
//         }));
//     };

//     // Selection limits
//     const LIMITS = {
//         interests: 10,
//         lifestyle: 4,
//         personality: 4,
//     };

//     const isAtLimit = (field) => formData[field].length >= LIMITS[field];
//     const isDisabledOption = (field, option) => !formData[field].includes(option) && isAtLimit(field);

//     // For Lifestyle and Personality: single-select per category
//     const handleSingleSelectInCategory = (field, categoryName, option, categoriesMap) => {
//         setFormData(prev => {
//             const groupOptions = categoriesMap[categoryName] || [];
//             // remove any existing selection from this category group
//             const withoutGroup = prev[field].filter(item => !groupOptions.includes(item));
//             const alreadySelected = prev[field].includes(option);
//             return {
//                 ...prev,
//                 [field]: alreadySelected ? withoutGroup : [...withoutGroup, option]
//             };
//         });
//     };

//     const handleInputFocus = (e) => {
//         e.target.style.border = '2px solid #ff6b9d';
//         e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
//     };

//     const handleInputBlur = (e) => {
//         e.target.style.border = '2px solid rgba(255, 107, 157, 0.2)';
//         e.target.style.boxShadow = 'none';
//     };

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             const userid = sessionStorage.getItem('userid');
//             const response = await fetch('http://localhost:8000/api/update_user_profile/', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     userid,
//                     ...formData
//                 })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 toast.success('Profile updated successfully!');
//                 setIsEditing(false);
//                 // Refresh user data
//                 fetchUserProfile(userid);
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.error || 'Failed to update profile');
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             toast.error('Error updating profile');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleCancel = () => {
//         // Reset form data to original user data
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 email: user.email || '',
//                 gender: user.gender || '',
//                 interestedIn: user.interestedIn || '',
//                 lookingFor: user.lookingFor || '',
//                 distance: user.distance || 80,
//                 education: user.education || '',
//                 interests: user.interests || [],
//                 lifestyle: user.lifestyle || [],
//                 personality: user.personality || [],
//                 images: user.images || []
//             });
//         }
//         setIsEditing(false);
//     };

//     const pageStyle = {
//         minHeight: 'calc(100vh - 200px)',
//         width: '100vw',
//         background: `
//       linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #667eea 75%, #764ba2 100%),
//       radial-gradient(circle at 25% 25%, rgba(255, 107, 157, 0.4) 0%, transparent 50%),
//       radial-gradient(circle at 75% 75%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
//       radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.2) 0%, transparent 70%)
//     `,
//         backgroundSize: '350% 350%, 100% 100%, 100% 100%, 100% 100%',
//         animation: 'profileGradient 30s ease infinite',
//         paddingTop: '100px',
//         paddingBottom: '40px',
//         paddingLeft: '20px',
//         paddingRight: '20px',
//         boxSizing: 'border-box',
//         position: 'relative',
//     };

//     const containerStyle = {
//         maxWidth: '900px',
//         margin: '0 auto',
//         background: 'rgba(255, 255, 255, 0.95)',
//         backdropFilter: 'blur(20px)',
//         borderRadius: '24px',
//         padding: '32px',
//         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
//     };

//     const headerStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: '32px',
//         paddingBottom: '16px',
//         borderBottom: '2px solid rgba(255, 107, 157, 0.2)',
//     };

//     const titleStyle = {
//         fontSize: '32px',
//         fontWeight: 'bold',
//         color: '#c44569',
//         margin: 0,
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//     };

//     const buttonStyle = {
//         padding: '12px 24px',
//         borderRadius: '12px',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '16px',
//         fontWeight: '600',
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//     };

//     const editButtonStyle = {
//         ...buttonStyle,
//         background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//         color: 'white',
//     };

//     const saveButtonStyle = {
//         ...buttonStyle,
//         background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//         color: 'white',
//     };

//     const cancelButtonStyle = {
//         ...buttonStyle,
//         background: 'rgba(108, 117, 125, 0.1)',
//         color: '#6c757d',
//         border: '2px solid #6c757d',
//     };

//     const sectionStyle = {
//         marginBottom: '32px',
//         padding: '24px',
//         background: 'rgba(255, 255, 255, 0.8)',
//         borderRadius: '16px',
//         border: '1px solid rgba(255, 107, 157, 0.2)',
//     };

//     const sectionTitleStyle = {
//         fontSize: '20px',
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: '16px',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//     };

//     const inputStyle = {
//         width: '100%',
//         padding: '12px 16px',
//         borderRadius: '12px',
//         border: '2px solid rgba(255, 107, 157, 0.2)',
//         fontSize: '16px',
//         transition: 'all 0.3s ease',
//         background: 'rgba(255, 255, 255, 0.95)',
//         color: '#333',
//         outline: 'none',
//     };

//     const selectStyle = {
//         ...inputStyle,
//         cursor: 'pointer',
//         color: '#333',
//     };

//     const tagContainerStyle = {
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '8px',
//         marginTop: '8px',
//     };

//     const tagStyle = {
//         padding: '6px 12px',
//         borderRadius: '20px',
//         background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//         color: 'white',
//         fontSize: '14px',
//         fontWeight: '500',
//     };

//     const categorySelectorStyle = {
//         maxHeight: '300px',
//         overflowY: 'auto',
//         border: '2px solid rgba(255, 107, 157, 0.2)',
//         borderRadius: '12px',
//         padding: '16px',
//         background: 'rgba(255, 255, 255, 0.95)',
//     };

//     const categoryGroupStyle = {
//         marginBottom: '20px',
//     };

//     const categoryTitleStyle = {
//         fontSize: '16px',
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: '12px',
//         paddingBottom: '4px',
//         borderBottom: '1px solid rgba(255, 107, 157, 0.2)',
//     };

//     const categoryOptionsStyle = {
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '8px',
//     };

//     const categoryOptionStyle = {
//         padding: '8px 12px',
//         borderRadius: '16px',
//         fontSize: '14px',
//         fontWeight: '500',
//         cursor: 'pointer',
//         border: '2px solid rgba(255, 107, 157, 0.2)',
//         background: 'rgba(255, 255, 255, 0.8)',
//         color: '#333',
//         transition: 'all 0.3s ease',
//     };

//     const selectedCategoryOptionStyle = {
//         ...categoryOptionStyle,
//         background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//         color: 'white',
//         border: '2px solid #ff6b9d',
//         boxShadow: '0 2px 8px rgba(255, 107, 157, 0.3)',
//     };

//     const disabledCategoryOptionStyle = {
//         ...categoryOptionStyle,
//         opacity: 0.5,
//         cursor: 'not-allowed',
//         filter: 'grayscale(40%)',
//     };

//     const removeTagStyle = {
//         ...tagStyle,
//         display: 'flex',
//         alignItems: 'center',
//         gap: '6px',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//     };

//     const profileImageStyle = {
//         width: '120px',
//         height: '120px',
//         borderRadius: '50%',
//         objectFit: 'cover',
//         border: '4px solid #ff6b9d',
//         marginBottom: '16px',
//     };

//     if (loading) {
//         return (
//             <div style={pageStyle}>
//                 <div style={containerStyle}>
//                     <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//                         <div style={{ fontSize: '24px', color: '#c44569', fontWeight: 'bold' }}>
//                             Loading your profile...
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div style={pageStyle}>
//             {/* Floating animated elements */}
//             <div style={{
//                 position: 'absolute',
//                 top: '15%',
//                 left: '8%',
//                 width: '70px',
//                 height: '70px',
//                 background: 'rgba(255, 255, 255, 0.1)',
//                 borderRadius: '50%',
//                 animation: 'profileFloat 12s ease-in-out infinite',
//                 backdropFilter: 'blur(15px)',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//             }} />
//             <div style={{
//                 position: 'absolute',
//                 top: '25%',
//                 right: '12%',
//                 width: '55px',
//                 height: '55px',
//                 background: 'rgba(240, 147, 251, 0.15)',
//                 borderRadius: '50%',
//                 animation: 'profileFloat 10s ease-in-out infinite reverse',
//                 backdropFilter: 'blur(15px)',
//                 border: '1px solid rgba(240, 147, 251, 0.25)',
//             }} />
//             <div style={{
//                 position: 'absolute',
//                 bottom: '25%',
//                 left: '10%',
//                 width: '60px',
//                 height: '60px',
//                 background: 'rgba(79, 172, 254, 0.12)',
//                 borderRadius: '50%',
//                 animation: 'profileFloat 14s ease-in-out infinite',
//                 backdropFilter: 'blur(15px)',
//                 border: '1px solid rgba(79, 172, 254, 0.22)',
//             }} />
//             <div style={{
//                 position: 'absolute',
//                 bottom: '20%',
//                 right: '8%',
//                 width: '50px',
//                 height: '50px',
//                 background: 'rgba(255, 107, 157, 0.18)',
//                 borderRadius: '50%',
//                 animation: 'profileFloat 11s ease-in-out infinite reverse',
//                 backdropFilter: 'blur(15px)',
//                 border: '1px solid rgba(255, 107, 157, 0.28)',
//             }} />

//             <div style={containerStyle}>
//                 <div style={headerStyle}>
//                     <h1 style={titleStyle}>
//                         <FaUser />
//                         My Profile
//                     </h1>
//                     <div style={{ display: 'flex', gap: '12px' }}>
//                         {!isEditing ? (
//                             <button
//                                 style={editButtonStyle}
//                                 onClick={() => setIsEditing(true)}
//                                 onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                             >
//                                 <FaEdit />
//                                 Edit Profile
//                             </button>
//                         ) : (
//                             <>
//                                 <button
//                                     style={saveButtonStyle}
//                                     onClick={handleSave}
//                                     disabled={saving}
//                                     onMouseEnter={(e) => !saving && (e.target.style.transform = 'translateY(-2px)')}
//                                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                                 >
//                                     <FaSave />
//                                     {saving ? 'Saving...' : 'Save Changes'}
//                                 </button>
//                                 <button
//                                     style={cancelButtonStyle}
//                                     onClick={handleCancel}
//                                     onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                                 >
//                                     <FaTimes />
//                                     Cancel
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* Profile Picture Section */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaCamera />
//                         Profile Picture
//                     </h2>
//                     <div style={{ textAlign: 'center' }}>
//                         {user?.profilePic ? (
//                             <img
//                                 src={user.profilePic}
//                                 alt="Profile"
//                                 style={profileImageStyle}
//                             />
//                         ) : (
//                             <div style={{
//                                 ...profileImageStyle,
//                                 background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 fontSize: '48px',
//                                 color: 'white',
//                             }}>
//                                 <FaUser />
//                             </div>
//                         )}
//                         {isEditing && (
//                             <button style={{
//                                 ...buttonStyle,
//                                 background: 'rgba(255, 107, 157, 0.1)',
//                                 color: '#c44569',
//                                 border: '2px solid #c44569',
//                                 margin: '0 auto',
//                             }}>
//                                 <FaCamera />
//                                 Change Photo
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Basic Information */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaUser />
//                         Basic Information
//                     </h2>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Name
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={inputStyle}
//                                     placeholder="Enter your name"
//                                 />
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.name || 'Not specified'}
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Email
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={inputStyle}
//                                     placeholder="Enter your email"
//                                 />
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.email || 'Not specified'}
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Gender
//                             </label>
//                             {isEditing ? (
//                                 <select
//                                     name="gender"
//                                     value={formData.gender}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={selectStyle}
//                                 >
//                                     <option value="">Select gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.gender || 'Not specified'}
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Interested In
//                             </label>
//                             {isEditing ? (
//                                 <select
//                                     name="interestedIn"
//                                     value={formData.interestedIn}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={selectStyle}
//                                 >
//                                     <option value="">Select preference</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Both">Both</option>
//                                 </select>
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.interestedIn || 'Not specified'}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Dating Preferences */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaHeart />
//                         Dating Preferences
//                     </h2>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Looking For
//                             </label>
//                             {isEditing ? (
//                                 <select
//                                     name="lookingFor"
//                                     value={formData.lookingFor}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={selectStyle}
//                                 >
//                                     <option value="">Select what you're looking for</option>
//                                     <option value="Long-term partner">Long-term partner</option>
//                                     <option value="Long-term, open to short">Long-term, open to short</option>
//                                     <option value="Short-term, open to long">Short-term, open to long</option>
//                                     <option value="Short-term fun">Short-term fun</option>
//                                     <option value="New friends">New friends</option>
//                                     <option value="Still figuring it out">Still figuring it out</option>
//                                 </select>
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.lookingFor || 'Not specified'}
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
//                                 Distance (km)
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     name="distance"
//                                     value={formData.distance}
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                     onBlur={handleInputBlur}
//                                     style={inputStyle}
//                                     min="1"
//                                     max="500"
//                                 />
//                             ) : (
//                                 <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                                     {user?.distance || 80} km
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Education */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaGraduationCap />
//                         Education
//                     </h2>
//                     {isEditing ? (
//                         <input
//                             type="text"
//                             name="education"
//                             value={formData.education}
//                             onChange={handleInputChange}
//                             onFocus={handleInputFocus}
//                             onBlur={handleInputBlur}
//                             style={inputStyle}
//                             placeholder="e.g., Bachelor's in Computer Science"
//                         />
//                     ) : (
//                         <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
//                             {user?.education || 'Not specified'}
//                         </div>
//                     )}
//                 </div>

//                 {/* Interests */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaUsers />
//                         Interests {isEditing && (
//                             <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
//                                 ({formData.interests.length}/{LIMITS.interests})
//                             </span>
//                         )}
//                     </h2>
//                     {isEditing ? (
//                         <div style={categorySelectorStyle}>
//                             {Object.entries(INTERESTS_CATEGORIES).map(([category, options]) => (
//                                 <div key={category} style={categoryGroupStyle}>
//                                     <h4 style={categoryTitleStyle}>{category}</h4>
//                                     <div style={categoryOptionsStyle}>
//                                         {options.map((option) => {
//                                             const isSelected = formData.interests.includes(option);
//                                             const disabled = isDisabledOption('interests', option);
//                                             return (
//                                                 <div
//                                                     key={option}
//                                                     onClick={() => {
//                                                         if (!disabled || isSelected) {
//                                                             handleCategoryToggle('interests', option);
//                                                         }
//                                                     }}
//                                                     style={isSelected ? selectedCategoryOptionStyle : (disabled ? disabledCategoryOptionStyle : categoryOptionStyle)}
//                                                     onMouseEnter={(e) => !isSelected && !disabled && (e.target.style.transform = 'translateY(-1px)')}
//                                                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                                                     title={disabled ? `You can select up to ${LIMITS.interests}` : ''}
//                                                 >
//                                                     {option}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={tagContainerStyle}>
//                             {user?.interests && user.interests.length > 0 ? (
//                                 user.interests.map((interest, index) => (
//                                     <span key={index} style={tagStyle}>{interest}</span>
//                                 ))
//                             ) : (
//                                 <span style={{ color: '#666', fontStyle: 'italic' }}>No interests specified</span>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* Lifestyle */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaDumbbell />
//                         Lifestyle {isEditing && (
//                             <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
//                                 ({formData.lifestyle.length}/{LIMITS.lifestyle})
//                             </span>
//                         )}
//                     </h2>
//                     {isEditing ? (
//                         <div style={categorySelectorStyle}>
//                             {Object.entries(LIFESTYLE_CATEGORIES).map(([category, options]) => (
//                                 <div key={category} style={categoryGroupStyle}>
//                                     <h4 style={categoryTitleStyle}>{category}</h4>
//                                     <div style={categoryOptionsStyle}>
//                                         {options.map((option) => {
//                                             const isSelected = formData.lifestyle.includes(option);
//                                             return (
//                                                 <div
//                                                     key={option}
//                                                     onClick={() => handleSingleSelectInCategory('lifestyle', category, option, LIFESTYLE_CATEGORIES)}
//                                                     style={isSelected ? selectedCategoryOptionStyle : categoryOptionStyle}
//                                                     onMouseEnter={(e) => !isSelected && (e.target.style.transform = 'translateY(-1px)')}
//                                                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                                                 >
//                                                     {option}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={tagContainerStyle}>
//                             {user?.lifestyle && user.lifestyle.length > 0 ? (
//                                 user.lifestyle.map((item, index) => (
//                                     <span key={index} style={tagStyle}>{item}</span>
//                                 ))
//                             ) : (
//                                 <span style={{ color: '#666', fontStyle: 'italic' }}>No lifestyle preferences specified</span>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* Personality */}
//                 <div style={sectionStyle}>
//                     <h2 style={sectionTitleStyle}>
//                         <FaBrain />
//                         Personality {isEditing && (
//                             <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
//                                 ({formData.personality.length}/{LIMITS.personality})
//                             </span>
//                         )}
//                     </h2>
//                     {isEditing ? (
//                         <div style={categorySelectorStyle}>
//                             {Object.entries(PERSONALITY_CATEGORIES).map(([category, options]) => (
//                                 <div key={category} style={categoryGroupStyle}>
//                                     <h4 style={categoryTitleStyle}>{category}</h4>
//                                     <div style={categoryOptionsStyle}>
//                                         {options.map((option) => {
//                                             const isSelected = formData.personality.includes(option);
//                                             return (
//                                                 <div
//                                                     key={option}
//                                                     onClick={() => handleSingleSelectInCategory('personality', category, option, PERSONALITY_CATEGORIES)}
//                                                     style={isSelected ? selectedCategoryOptionStyle : categoryOptionStyle}
//                                                     onMouseEnter={(e) => !isSelected && (e.target.style.transform = 'translateY(-1px)')}
//                                                     onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                                                 >
//                                                     {option}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={tagContainerStyle}>
//                             {user?.personality && user.personality.length > 0 ? (
//                                 user.personality.map((trait, index) => (
//                                     <span key={index} style={tagStyle}>{trait}</span>
//                                 ))
//                             ) : (
//                                 <span style={{ color: '#666', fontStyle: 'italic' }}>No personality traits specified</span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaHeart, FaGraduationCap, FaMapMarkerAlt, FaUsers, FaBrain, FaDumbbell, FaPlus, FaMinus } from 'react-icons/fa';

// Predefined categories
const INTERESTS_CATEGORIES = {
    'Creativity': ['Poetry', 'Sneakers', 'Freelancing', 'Photography', 'Choir', 'Cosplay', 'Content Creation', 'Vintage fashion', 'Investing', 'Singing', 'Language Exchange', 'Writing', 'Literature', 'NFTs', 'Tattoos', 'Painting', 'Upcycling', 'Entrepreneurship', 'Acapella', 'Musical Instrument', 'Musical Writing', 'Dancing', 'Exchange Program', 'Art', 'Real Estate', 'Drawing', 'Blogging', 'Fashion', 'DIY'],
    'Social and content': ['Instagram', 'SoundCloud', 'Pinterest', 'Spotify', 'Social Media', 'Vlogging', 'YouTube', 'Virtual Reality', 'Memes', 'Metaverse', 'Podcasts', 'TikTok', 'Twitch', 'Netflix'],
    'Sports and fitness': ['Freeletics', 'Cricket', 'Ice Hockey', 'Sports Shooting', 'Athletics', 'Sports', 'Walking', 'Beach sports', 'Fitness classes', 'Skating', 'Rugby', 'Boxing', 'Badminton', 'Pilates', 'Cheerleading', 'Pole Dancing', 'Car Racing', 'Motor Sports', 'Jogging', 'Football', 'Tennis', 'Skateboarding'],
    'Music': ['Bhangra', 'K-Pop', 'Gospel music', 'Music bands', 'Rock music', 'Soul music', 'Pop music', 'Punk rock', 'Rap music', 'Folk music', 'Latin music', 'Alternative music', 'Techno', 'Jazz', 'House music', 'EDM', 'R&B', 'Indie music', 'Opera', 'Heavy Metal', 'Funk music', 'Reggaeton', 'Country Music', 'Hip Hop', 'J-Pop', 'Electronic Music', 'Grime', '90s Britpop', 'Trap Music'],
    'Gaming': ['Ludo', 'PlayStation', 'E-Sports', 'Fortnite', 'Xbox', 'League of Legends', 'Nintendo', 'Among Us', 'Atari', 'Roblox'],
    'Going out': ['Festivals', 'Stand up Comedy', 'Escape Rooms', 'Bars', 'Thrifting', 'Museums', 'Raves', 'Drive-in Cinema', 'Musical theater', 'Cafe hopping', 'Aquarium', 'Clubbing', 'Exhibition', 'Shopping', 'Cars', 'Pub Quiz', 'Happy hour', 'Karaoke', 'House Parties', 'Theater', 'Shisha', 'Rollerskating', 'Live Music', 'Bar Hopping', 'Bowling'],
    'Outdoors and adventure': ['Road Trips', 'Rowing', 'Diving', 'Jetskiing'],
    'Fan favorites': ['90s Kid', 'Comic-con', 'Harry Potter', 'NBA', 'WWE', 'Dungeons & Dragons', 'Meme', 'Marvel', 'Anime'],
    'Movies and TV Shows': ['Action', 'Romance', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Documentaries', 'Bollywood', 'K-Drama', 'Crime Shows', 'Animated', 'Sitcoms', 'Reality TV'],
    'Wellness': ['Yoga', 'Meditation', 'Journaling', 'Breathwork', 'Mindfulness', 'Therapy', 'Spa', 'Healthy Eating', 'Home Remedies', 'Fitness Tracker']
};

const LIFESTYLE_CATEGORIES = {
    'Drinking': ['Not for me', 'Sober', 'Sober curious', 'On special occasions', 'Socially on weekends', 'Most Nights'],
    'Smoking': ['Social smoker', 'Smoker when drinking', 'Non-smoker', 'Smoker', 'Trying to quit'],
    'Fitness': ['Everyday', 'Often', 'Sometimes', 'Never'],
    'Pets': ['Dog', 'Cat', 'Reptile', 'Amphibian', 'Bird', 'Fish', 'Don\'t have but love', 'Other', 'Turtle', 'Hamster', 'Rabbit', 'Pet-free', 'All the pets']
};

const PERSONALITY_CATEGORIES = {
    'Communication': ['I stay on WhatsApp all day', 'Big time texter', 'Phone caller', 'Video chatter', 'I\'m slow to answer on WhatsApp', 'Bad texter', 'Better in person'],
    'Love Languages': ['Thoughtful gestures', 'Presents', 'Touch', 'Compliments', 'Time together'],
    'Education': ['Bachelors', 'In College', 'High School', 'PhD', 'In Grad School', 'Masters', 'Trade School'],
    'Zodiac': ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
};

// Add keyframe animation for Profile background
const addProfileAnimation = () => {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes profileGradient {
      0% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
      25% { background-position: 100% 50%, 100% 100%, 100% 100%, 100% 100%; }
      50% { background-position: 100% 0%, 0% 100%, 100% 0%, 0% 100%; }
      75% { background-position: 0% 100%, 100% 0%, 0% 100%, 100% 0%; }
      100% { background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%; }
    }
    @keyframes profileFloat {
      0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
      25% { transform: translateY(-10px) scale(1.05) rotate(90deg); }
      50% { transform: translateY(-18px) scale(0.95) rotate(180deg); }
      75% { transform: translateY(-6px) scale(1.02) rotate(270deg); }
    }
  `;
    document.head.appendChild(style);
    return style;
};

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Form state for editing
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        interestedIn: '',
        lookingFor: '',
        distance: 80,
        education: '',
        interests: [],
        lifestyle: [],
        personality: [],
        images: []
    });

    useEffect(() => {
        const userid = sessionStorage.getItem('userid');
        if (!userid) {
            navigate('/login');
            return;
        }
        fetchUserProfile(userid);
    }, [navigate]);

    // Add background animation
    useEffect(() => {
        const style = addProfileAnimation();
        return () => {
            if (style && style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, []);

    const fetchUserProfile = async (userid) => {
        try {
            const response = await fetch('http://localhost:8000/api/get_user_profile/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid })
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setFormData({
                    name: data.user.name || '',
                    email: data.user.email || '',
                    gender: data.user.gender || '',
                    interestedIn: data.user.interestedIn || '',
                    lookingFor: data.user.lookingFor || '',
                    distance: data.user.distance || 80,
                    education: data.user.education || '',
                    interests: data.user.interests || [],
                    lifestyle: data.user.lifestyle || [],
                    personality: data.user.personality || [],
                    images: data.user.images || []
                });
            } else {
                toast.error('Failed to load profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Error loading profile');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleArrayChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Helper functions for category selection
    const handleCategoryToggle = (field, category) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(category)
                ? prev[field].filter(item => item !== category)
                : [...prev[field], category]
        }));
    };

    const handleCategoryRemove = (field, category) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter(item => item !== category)
        }));
    };

    // Selection limits
    const LIMITS = {
        interests: 10,
        lifestyle: 4,
        personality: 4,
    };

    const isAtLimit = (field) => formData[field].length >= LIMITS[field];
    const isDisabledOption = (field, option) => !formData[field].includes(option) && isAtLimit(field);

    // For Lifestyle and Personality: single-select per category
    const handleSingleSelectInCategory = (field, categoryName, option, categoriesMap) => {
        setFormData(prev => {
            const groupOptions = categoriesMap[categoryName] || [];
            // remove any existing selection from this category group
            const withoutGroup = prev[field].filter(item => !groupOptions.includes(item));
            const alreadySelected = prev[field].includes(option);
            return {
                ...prev,
                [field]: alreadySelected ? withoutGroup : [...withoutGroup, option]
            };
        });
    };

    const handleInputFocus = (e) => {
        e.target.style.border = '2px solid #ff6b9d';
        e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
    };

    const handleInputBlur = (e) => {
        e.target.style.border = '2px solid rgba(255, 107, 157, 0.2)';
        e.target.style.boxShadow = 'none';
    };

    // Handle profile photo select and preview
    const handlePhotoSelect = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setFormData(prev => {
                const images = Array.isArray(prev.images) ? [...prev.images] : [];
                if (images.length === 0) {
                    images.push({ data: dataUrl });
                } else {
                    images[0] = { data: dataUrl };
                }
                return { ...prev, images };
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const userid = sessionStorage.getItem('userid');
            const response = await fetch('http://localhost:8000/api/update_user_profile/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userid,
                    ...formData
                })
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Profile updated successfully!');
                setIsEditing(false);
                // Refresh user data
                fetchUserProfile(userid);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to original user data
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                gender: user.gender || '',
                interestedIn: user.interestedIn || '',
                lookingFor: user.lookingFor || '',
                distance: user.distance || 80,
                education: user.education || '',
                interests: user.interests || [],
                lifestyle: user.lifestyle || [],
                personality: user.personality || [],
                images: user.images || []
            });
        }
        setIsEditing(false);
    };

    const pageStyle = {
        minHeight: 'calc(100vh - 200px)',
        width: '100vw',
        background: `
      linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #667eea 75%, #764ba2 100%),
      radial-gradient(circle at 25% 25%, rgba(255, 107, 157, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.2) 0%, transparent 70%)
    `,
        backgroundSize: '350% 350%, 100% 100%, 100% 100%, 100% 100%',
        animation: 'profileGradient 30s ease infinite',
        paddingTop: '100px',
        paddingBottom: '40px',
        paddingLeft: '20px',
        paddingRight: '20px',
        boxSizing: 'border-box',
        position: 'relative',
    };

    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '2px solid rgba(255, 107, 157, 0.2)',
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#c44569',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    };

    const buttonStyle = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const editButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        color: 'white',
    };

    const saveButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        background: 'rgba(108, 117, 125, 0.1)',
        color: '#6c757d',
        border: '2px solid #6c757d',
    };

    const sectionStyle = {
        marginBottom: '32px',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 107, 157, 0.2)',
    };

    const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '2px solid rgba(255, 107, 157, 0.2)',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        outline: 'none',
    };

    const selectStyle = {
        ...inputStyle,
        cursor: 'pointer',
        color: '#333',
    };

    const tagContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '8px',
    };

    const tagStyle = {
        padding: '6px 12px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
    };

    const categorySelectorStyle = {
        maxHeight: '300px',
        overflowY: 'auto',
        border: '2px solid rgba(255, 107, 157, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
    };

    const categoryGroupStyle = {
        marginBottom: '20px',
    };

    const categoryTitleStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '12px',
        paddingBottom: '4px',
        borderBottom: '1px solid rgba(255, 107, 157, 0.2)',
    };

    const categoryOptionsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    };

    const categoryOptionStyle = {
        padding: '8px 12px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: '2px solid rgba(255, 107, 157, 0.2)',
        background: 'rgba(255, 255, 255, 0.8)',
        color: '#333',
        transition: 'all 0.3s ease',
    };

    const selectedCategoryOptionStyle = {
        ...categoryOptionStyle,
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        color: 'white',
        border: '2px solid #ff6b9d',
        boxShadow: '0 2px 8px rgba(255, 107, 157, 0.3)',
    };

    const disabledCategoryOptionStyle = {
        ...categoryOptionStyle,
        opacity: 0.5,
        cursor: 'not-allowed',
        filter: 'grayscale(40%)',
    };

    const removeTagStyle = {
        ...tagStyle,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const profileImageStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #ff6b9d',
        marginBottom: '16px',
    };

    if (loading) {
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '24px', color: '#c44569', fontWeight: 'bold' }}>
                            Loading your profile...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            {/* Floating animated elements */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '8%',
                width: '70px',
                height: '70px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'profileFloat 12s ease-in-out infinite',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
            }} />
            <div style={{
                position: 'absolute',
                top: '25%',
                right: '12%',
                width: '55px',
                height: '55px',
                background: 'rgba(240, 147, 251, 0.15)',
                borderRadius: '50%',
                animation: 'profileFloat 10s ease-in-out infinite reverse',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(240, 147, 251, 0.25)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '10%',
                width: '60px',
                height: '60px',
                background: 'rgba(79, 172, 254, 0.12)',
                borderRadius: '50%',
                animation: 'profileFloat 14s ease-in-out infinite',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(79, 172, 254, 0.22)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '8%',
                width: '50px',
                height: '50px',
                background: 'rgba(255, 107, 157, 0.18)',
                borderRadius: '50%',
                animation: 'profileFloat 11s ease-in-out infinite reverse',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 107, 157, 0.28)',
            }} />

            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>
                        <FaUser />
                        My Profile
                    </h1>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {!isEditing ? (
                            <button
                                style={editButtonStyle}
                                onClick={() => setIsEditing(true)}
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                <FaEdit />
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    style={saveButtonStyle}
                                    onClick={handleSave}
                                    disabled={saving}
                                    onMouseEnter={(e) => !saving && (e.target.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    <FaSave />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    style={cancelButtonStyle}
                                    onClick={handleCancel}
                                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    <FaTimes />
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Profile Picture Section */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaCamera />
                        Profile Picture
                    </h2>
                    <div style={{ textAlign: 'center' }}>
                        {(() => {
                            const editingPreview = isEditing && formData?.images && formData.images[0]?.data;
                            const src = editingPreview ? formData.images[0].data : (user?.profilePic || null);
                            if (src) {
                                return (
                                    <img
                                        src={src}
                                        alt="Profile"
                                        style={profileImageStyle}
                                    />
                                );
                            }
                            return (
                                <div style={{
                                    ...profileImageStyle,
                                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                    color: 'white',
                                }}>
                                    <FaUser />
                                </div>
                            );
                        })()}
                        {isEditing && (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handlePhotoSelect}
                                />
                                <button
                                    style={{
                                        ...buttonStyle,
                                        background: 'rgba(255, 107, 157, 0.1)',
                                        color: '#c44569',
                                        border: '2px solid #c44569',
                                        margin: '0 auto',
                                    }}
                                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    <FaCamera />
                                    Change Photo
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Basic Information */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaUser />
                        Basic Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle}
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.name || 'Not specified'}
                                </div>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle}
                                    placeholder="Enter your email"
                                />
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.email || 'Not specified'}
                                </div>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Gender
                            </label>
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={selectStyle}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.gender || 'Not specified'}
                                </div>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Interested In
                            </label>
                            {isEditing ? (
                                <select
                                    name="interestedIn"
                                    value={formData.interestedIn}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={selectStyle}
                                >
                                    <option value="">Select preference</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Both">Both</option>
                                </select>
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.interestedIn || 'Not specified'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dating Preferences */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaHeart />
                        Dating Preferences
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Looking For
                            </label>
                            {isEditing ? (
                                <select
                                    name="lookingFor"
                                    value={formData.lookingFor}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={selectStyle}
                                >
                                    <option value="">Select what you're looking for</option>
                                    <option value="Long-term partner">Long-term partner</option>
                                    <option value="Long-term, open to short">Long-term, open to short</option>
                                    <option value="Short-term, open to long">Short-term, open to long</option>
                                    <option value="Short-term fun">Short-term fun</option>
                                    <option value="New friends">New friends</option>
                                    <option value="Still figuring it out">Still figuring it out</option>
                                </select>
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.lookingFor || 'Not specified'}
                                </div>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Distance (km)
                            </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="distance"
                                    value={formData.distance}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle}
                                    min="1"
                                    max="500"
                                />
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                                    {user?.distance || 80} km
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaGraduationCap />
                        Education
                    </h2>
                    {isEditing ? (
                        <input
                            type="text"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            style={inputStyle}
                            placeholder="e.g., Bachelor's in Computer Science"
                        />
                    ) : (
                        <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '2px solid rgba(255, 107, 157, 0.1)', color: '#333', fontWeight: '500' }}>
                            {user?.education || 'Not specified'}
                        </div>
                    )}
                </div>

                {/* Interests */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaUsers />
                        Interests {isEditing && (
                            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
                                ({formData.interests.length}/{LIMITS.interests})
                            </span>
                        )}
                    </h2>
                    {isEditing ? (
                        <div style={categorySelectorStyle}>
                            {Object.entries(INTERESTS_CATEGORIES).map(([category, options]) => (
                                <div key={category} style={categoryGroupStyle}>
                                    <h4 style={categoryTitleStyle}>{category}</h4>
                                    <div style={categoryOptionsStyle}>
                                        {options.map((option) => {
                                            const isSelected = formData.interests.includes(option);
                                            const disabled = isDisabledOption('interests', option);
                                            return (
                                                <div
                                                    key={option}
                                                    onClick={() => {
                                                        if (!disabled || isSelected) {
                                                            handleCategoryToggle('interests', option);
                                                        }
                                                    }}
                                                    style={isSelected ? selectedCategoryOptionStyle : (disabled ? disabledCategoryOptionStyle : categoryOptionStyle)}
                                                    onMouseEnter={(e) => !isSelected && !disabled && (e.target.style.transform = 'translateY(-1px)')}
                                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                                    title={disabled ? `You can select up to ${LIMITS.interests}` : ''}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={tagContainerStyle}>
                            {user?.interests && user.interests.length > 0 ? (
                                user.interests.map((interest, index) => (
                                    <span key={index} style={tagStyle}>{interest}</span>
                                ))
                            ) : (
                                <span style={{ color: '#666', fontStyle: 'italic' }}>No interests specified</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Lifestyle */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaDumbbell />
                        Lifestyle {isEditing && (
                            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
                                ({formData.lifestyle.length}/{LIMITS.lifestyle})
                            </span>
                        )}
                    </h2>
                    {isEditing ? (
                        <div style={categorySelectorStyle}>
                            {Object.entries(LIFESTYLE_CATEGORIES).map(([category, options]) => (
                                <div key={category} style={categoryGroupStyle}>
                                    <h4 style={categoryTitleStyle}>{category}</h4>
                                    <div style={categoryOptionsStyle}>
                                        {options.map((option) => {
                                            const isSelected = formData.lifestyle.includes(option);
                                            return (
                                                <div
                                                    key={option}
                                                    onClick={() => handleSingleSelectInCategory('lifestyle', category, option, LIFESTYLE_CATEGORIES)}
                                                    style={isSelected ? selectedCategoryOptionStyle : categoryOptionStyle}
                                                    onMouseEnter={(e) => !isSelected && (e.target.style.transform = 'translateY(-1px)')}
                                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={tagContainerStyle}>
                            {user?.lifestyle && user.lifestyle.length > 0 ? (
                                user.lifestyle.map((item, index) => (
                                    <span key={index} style={tagStyle}>{item}</span>
                                ))
                            ) : (
                                <span style={{ color: '#666', fontStyle: 'italic' }}>No lifestyle preferences specified</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Personality */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <FaBrain />
                        Personality {isEditing && (
                            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
                                ({formData.personality.length}/{LIMITS.personality})
                            </span>
                        )}
                    </h2>
                    {isEditing ? (
                        <div style={categorySelectorStyle}>
                            {Object.entries(PERSONALITY_CATEGORIES).map(([category, options]) => (
                                <div key={category} style={categoryGroupStyle}>
                                    <h4 style={categoryTitleStyle}>{category}</h4>
                                    <div style={categoryOptionsStyle}>
                                        {options.map((option) => {
                                            const isSelected = formData.personality.includes(option);
                                            return (
                                                <div
                                                    key={option}
                                                    onClick={() => handleSingleSelectInCategory('personality', category, option, PERSONALITY_CATEGORIES)}
                                                    style={isSelected ? selectedCategoryOptionStyle : categoryOptionStyle}
                                                    onMouseEnter={(e) => !isSelected && (e.target.style.transform = 'translateY(-1px)')}
                                                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={tagContainerStyle}>
                            {user?.personality && user.personality.length > 0 ? (
                                user.personality.map((trait, index) => (
                                    <span key={index} style={tagStyle}>{trait}</span>
                                ))
                            ) : (
                                <span style={{ color: '#666', fontStyle: 'italic' }}>No personality traits specified</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
