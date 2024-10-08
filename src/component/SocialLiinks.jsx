import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im"; // Loader icon
import InteractiveBackground from "../three/ThreeJSBackground";
import socialMap from "../../socials";

const social = socialMap;

const SocialLinks = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Adding a loader for 2 Seconds for the Three.js background to load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Adding a Handle theme switch
  const handleThemeSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };


  // These are the Icons and the Social Links.
  const links = [
    { name: "Instagram", icon: <FaInstagram />, url: social.get("instagram") },
    { name: "Facebook", icon: <FaFacebook />, url: social.get("facebook") },
    { name: "GitHub", icon: <FaGithub />, url: social.get("github") },
    { name: "LinkedIn", icon: <FaLinkedin />, url: social.get("linkedin") },
    { name: "Twitter", icon: <FaTwitter />, url: social.get("twitter") },
  ];

  // A Loader component so that the user knows that the background is loading.
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-pulse">
          NexLink
        </h1>
        <ImSpinner9 className="animate-spin text-white text-6xl" />
        <p className="text-white mt-4 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Three.js Background */}
      <InteractiveBackground />

      {/* A Header  */}
      <header className="relative z-10 py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center">
          {/* Adding a Glowing Title with Gradient and Shadow */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg text-center tracking-wider animate-glow">
            NexLink
          </h1>
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-center mt-2 sm:mt-4 max-w-xs sm:max-w-lg lg:max-w-xl tracking-wide animate-fade-in opacity-90">
            Your gateway to{" "}
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-yellow-300" : "text-black"
              } dark:text-white`}
            >
              seamless
            </span>{" "}
            and{" "}
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-yellow-300" : "text-black"
              } dark:text-white`}
            >
              interactive
            </span>{" "}
            social connections.
          </p>

          {/* Decorative Underline */}
          <div className="w-16 h-1 sm:w-20 bg-gradient-to-r from-pink-500 to-purple-500 mt-3 sm:mt-4 rounded-full animate-pulse"></div>
        </div>
      </header>

      {/* Toggle Theme Button */}
      <div className="absolute top-4 right-4 z-50">
        <div
          className="relative inline-flex items-center cursor-pointer p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
          onClick={handleThemeSwitch}
        >
          <span className="text-2xl sm:text-3xl">
            {theme === "light" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </span>
          <div
            className={`ml-2 w-12 sm:w-14 h-6 sm:h-8 rounded-full transition-all duration-500 ease-in-out transform ${
              theme === "light" ? "bg-yellow-300" : "bg-blue-500"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white transition-all duration-500 ease-in-out ${
                theme === "light" ? "translate-x-0" : "translate-x-6 sm:translate-x-7"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="relative z-10 flex items-center justify-center py-10 sm:py-12 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 max-w-sm sm:max-w-lg lg:max-w-3xl transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-3xl">
          {/* Animated Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-center mb-4 sm:mb-6 lg:mb-8 tracking-wide animate-glow">
            Let&apos;s Connect
          </h2>

          {/* Links */}
          <ul className="flex flex-col items-center space-y-3 sm:space-y-5">
            {links.map((link, index) => (
              <li key={index} className="w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:bg-purple-50 dark:hover:bg-purple-800 hover:text-purple-800 dark:hover:text-white transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span className="text-2xl sm:text-3xl text-purple-600 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                    {link.icon}
                  </span>
                  <span className="ml-3 sm:ml-4 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200 transform transition-colors hover:text-purple-600 dark:hover:text-white">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
