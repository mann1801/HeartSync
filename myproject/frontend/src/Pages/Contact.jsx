// import React, { useState, useEffect, useRef } from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       if (sectionRef.current) {
//         sectionRef.current.classList.add('show');
//       }
//     }, 100);
//   }, []);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:8000/api/contact_message/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form)
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSubmitted(true);
//         setForm({ name: '', email: '', message: '' });
//       } else {
//         alert(data.error || 'Failed to send message. Please try again.');
//       }
//     } catch (err) {
//       alert('Network error. Please try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white overflow-x-hidden pt-16">
//       {/* Animated Background (floating blobs) */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Content */}
//       <section
//         ref={sectionRef}
//         className="container mx-auto px-4 py-16 min-h-screen flex items-center"
//         style={{ scrollMarginTop: '80px' }}
//       >
//         <div className="w-full max-w-6xl mx-auto">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//               Get in Touch
//             </h1>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Have questions about HeartSync? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             {/* Contact Information */}
//             <div className="space-y-8">
//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold mb-6 text-pink-400">Contact Information</h3>
//                 <div className="space-y-6">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
//                       <FaEnvelope className="text-white text-lg" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-white">Email</h4>
//                       <p className="text-gray-300">mannsoni181@gmail.com</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//                       <FaPhone className="text-white text-lg" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-white">Phone</h4>
//                       <p className="text-gray-300">+91 8200954193</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
//                       <FaMapMarkerAlt className="text-white text-lg" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-white">Address</h4>
//                       <p className="text-gray-300">123 Love Street, Heart City, HC 12345</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold mb-6 text-pink-400">Why Choose HeartSync?</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <p className="text-gray-300">AI-powered matching algorithm for better compatibility</p>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <p className="text-gray-300">Verified profiles for your safety and security</p>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <p className="text-gray-300">24/7 customer support to help you find love</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold mb-6 text-pink-400">Send us a Message</h3>
              
//               {submitted && (
//                 <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                       <FaPaperPlane className="text-white text-sm" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-green-400">Message Sent!</h4>
//                       <p className="text-green-300 text-sm">Thank you for contacting us. We'll get back to you soon!</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     required
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     required
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Enter your email address"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows="5"
//                     required
//                     value={form.message}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
//                     placeholder="Tell us how we can help you..."
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent"
//                 >
//                   <div className="flex items-center justify-center space-x-2">
//                     <FaPaperPlane className="text-sm" />
//                     <span>Send Message</span>
//                   </div>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/contact_message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white overflow-x-hidden pt-16">
      {/* Animated Background (floating blobs) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <section
        ref={sectionRef}
        className="container mx-auto px-4 py-16 min-h-screen flex items-center"
        style={{ scrollMarginTop: '80px' }}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about HeartSync? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-stretch">
            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:justify-between lg:h-full lg:gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-pink-400">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300">mannsoni181@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300">+91 8200954193</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Address</h4>
                      <p className="text-gray-300">123 Love Street, Heart City, HC 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full">
                <h3 className="text-xl font-bold mb-4 text-pink-400">Why Choose HeartSync?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-snug">AI-powered matching algorithm for better compatibility</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-snug">Verified profiles for your safety and security</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-snug">24/7 customer support to help you find love</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-pink-400">Send us a Message</h3>

              {submitted && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaPaperPlane className="text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400">Message Sent!</h4>
                      <p className="text-green-300 text-sm">Thank you for contacting us. We'll get back to you soon!</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full mb-6 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FaPaperPlane className="text-sm" />
                    <span>Send Message</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;