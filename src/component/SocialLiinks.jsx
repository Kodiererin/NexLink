import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im'; // Loader icon
import InteractiveBackground from '../three/ThreeJSBackground';
import socialMap from '../../socials';


const social = socialMap;

const SocialLinks = () => {
  const [loading, setLoading] = useState(true);

  // Adding a loader for 2 Seconds for the Three.js background to load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { name: "Instagram", icon: <FaInstagram />, url: social.get('instagram') },
    { name: "Facebook", icon: <FaFacebook />, url: social.get('facebook') },
    { name: "GitHub", icon: <FaGithub />, url: social.get('github') },
    { name: "LinkedIn", icon: <FaLinkedin />, url: social.get('linkedin') },
    { name: "Twitter", icon: <FaTwitter />, url: social.get('twitter') },
  ];

  // Loader component
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <h1 className="text-5xl font-bold text-white mb-8 animate-pulse">NexGraph</h1>
        <ImSpinner9 className="animate-spin text-white text-6xl" />
        <p className="text-white mt-4 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Three.js Background */}
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 py-10 sm:py-12">
        <div className="flex flex-col items-center justify-center">
          {/* Adding a Glowing Title with Gradient and Shadow */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg text-center tracking-widest animate-glow">
            NexGraph
          </h1>
          {/* Some Subtitle with Subtle Fade and Spacing */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 text-center mt-2 sm:mt-4 max-w-xs sm:max-w-lg lg:max-w-xl tracking-wide animate-fade-in opacity-90">
            Your gateway to <span className="font-semibold text-black">seamless</span> and <span className="font-semibold text-black">interactive</span> social connections.
          </p>
          {/* Some Decorative Underline */}
          <div className="w-16 h-1 sm:w-20 bg-gradient-to-r from-pink-500 to-purple-500 mt-3 sm:mt-4 rounded-full animate-pulse"></div>
        </div>
      </header>

      {/* Social Links */}
      <div className="relative z-10 flex items-center justify-center py-10 sm:py-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-md sm:max-w-lg lg:max-w-3xl transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-3xl">
          {/* Adding Animated Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-center mb-6 sm:mb-8 lg:mb-10 tracking-widest animate-glow">
            Let&apos;s Connect
          </h2>

          {/* Links */}
          <ul className="flex flex-col items-center space-y-4 sm:space-y-6">
            {links.map((link, index) => (
              <li key={index} className="w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 bg-white rounded-full shadow-lg hover:bg-purple-50 hover:text-purple-800 transform transition-all hover:scale-110 hover:shadow-2xl"
                >
                  {/* Adding Icon with Glow Effect */}
                  <span className="text-2xl sm:text-3xl text-purple-600 transform hover:scale-125 transition-transform duration-300 ease-in-out">
                    {link.icon}
                  </span>
                  {/* Adding Text with Animation */}
                  <span className="ml-3 sm:ml-4 text-base sm:text-lg font-medium text-gray-900 transform transition-colors hover:text-purple-600">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Floating Glow Effect */}
          <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-purple-400 opacity-70 rounded-full blur-2xl transform -translate-x-8 translate-y-8 animate-float" />
          <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-pink-500 opacity-50 rounded-full blur-3xl transform translate-x-8 -translate-y-8 animate-float delay-2000" />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
