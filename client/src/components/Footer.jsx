import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Connect with Me</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <Link to="/about" className="text-gray-400 hover:text-gray-300 mx-2">About</Link>
          <Link to="/services" className="text-gray-400 hover:text-gray-300 mx-2">Services</Link>
          <Link to="/contact" className="text-gray-400 hover:text-gray-300 mx-2">Contact</Link>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Vikash Bharal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
