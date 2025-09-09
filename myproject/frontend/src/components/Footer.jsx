import React from 'react';
import { FaApple, FaGooglePlay, FaHeart, FaInstagram, FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <footer id="download" className="relative z-10 bg-gradient-to-br from-black/40 via-purple-900/50 to-pink-900/40 backdrop-blur-xl text-gray-200 py-16 px-8 border-t border-white/30 shadow-2xl" >
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 flex items-center mb-6">
                            <FaHeart className="mr-3" />
                            HeartSync
                        </div>
                        <p className="text-gray-200 leading-relaxed">Connecting hearts, building relationships. Find your perfect match with our innovative dating platform.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">About Us</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Careers</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Press</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Help Center</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Safety Tips</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Contact Us</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-1 no-underline hover:no-underline">GDPR</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/30 pt-8 text-center">
                    <div className="flex justify-center gap-4 mb-4">
                        <a href="https://www.apple.com/app-store/" aria-label="App Store" target="_blank" className="no-underline hover:no-underline w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500/40 hover:to-purple-500/40 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                            <FaApple className="text-white" />
                        </a>
                        <a href="https://play.google.com/" aria-label="Google Play" target="_blank" className="no-underline hover:no-underline w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-cyan-500/40 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                            <FaGooglePlay className="text-white" />
                        </a>
                        <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" className="no-underline hover:no-underline w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-white/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500/40 hover:to-orange-500/40 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                            <FaInstagram className="text-white" />
                        </a>
                        <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" className="no-underline hover:no-underline w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-white/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600/40 hover:to-blue-800/40 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                            <FaFacebook className="text-white" />
                        </a>
                    </div>
                    <p className="text-gray-200 font-medium">&copy; {new Date().getFullYear()} HeartSync. All rights reserved. Made with ❤️ for love.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
