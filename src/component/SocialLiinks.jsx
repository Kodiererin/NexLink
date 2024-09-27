
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialLinks = () => {
  const links = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Connect with Me</h1>
        <ul className="flex flex-col items-center space-y-4">
          {links.map((link, index) => (
            <li key={index} className="w-full">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transform transition-all hover:scale-105 hover:shadow-lg"
              >
                <span className="text-xl text-gray-700">{link.icon}</span>
                <span className="ml-4 text-lg font-medium text-gray-800">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialLinks;
