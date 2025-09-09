// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Home from './Home/Home';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Login from './Login/Login';
// import Signup from './Login/Signup';
// import MatchCardStack from './Home/MatchCardStack';
// import MyMatches from './Home/MyMatches';
// import Messages from './Pages/Messages';
// import ChatPage from './Pages/ChatPage';
// import NotFound from './components/NotFound';
// import ErrorBoundary from './components/ErrorBoundary';
// import Contact from './Pages/Contact';
// import Profile from './Pages/Profile';
// import ScrollToTop from './components/ScrollToTop';


// function App() {
//   return (
//     <ErrorBoundary>
//       <Router>
//         <Navbar />
//         <ScrollToTop />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/match' element={<MatchCardStack />} />
//           <Route path='/mymatches' element={<MyMatches />} />
//           <Route path='/messages' element={<Messages />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/chat/:userId' element={<ChatPage />} />
//           <Route path='*' element={<NotFound />} />
//         </Routes>
//         <Footer />
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//           toastStyle={{
//             background: "linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)",
//             color: "white",
//             borderRadius: "16px",
//             fontSize: "16px",
//             fontWeight: "600",
//           }}
//         />
//       </Router>
//     </ErrorBoundary>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './Login/Login';
import Signup from './Login/Signup';
import MatchCardStack from './Home/MatchCardStack';
import MyMatches from './Home/MyMatches';
import Messages from './Pages/Messages';
import ChatPage from './Pages/ChatPage';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/match' element={<MatchCardStack />} />
          <Route path='/mymatches' element={<MyMatches />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat/:userId' element={<ChatPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)",
            color: "white",
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;