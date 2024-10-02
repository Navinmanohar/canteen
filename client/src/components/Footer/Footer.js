import React from 'react';

const Footer = ({ links, companyName, year }) => {
  return (
    <footer className="bg-gray-800 text-white py-6 mb-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col  justify-between items-center">
          {/* Company Name and Year */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">&copy; {year || new Date().getFullYear()} {companyName || 'Your Company'}. All rights reserved.</p>
          </div>

          {/* Footer Links */}
          <ul className="flex space-x-4 mb-4 md:mb-0">
            {links?.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="hover:text-gray-400 transition duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
