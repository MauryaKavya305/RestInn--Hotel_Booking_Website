import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div>
          <h3 className="text-2xl font-bold mb-6">RestInn</h3>
          <p className="text-gray-400">Providing the most comfortable and memorable hotel booking experience across India.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 cursor-pointer"><li className="hover:text-white">Browse Hotels</li><li className="hover:text-white">Terms & Privacy</li></ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <p className="text-gray-400">Luxury Lane, Mumbai, IN</p>
          <p className="text-gray-400">support@restinn.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <div className="flex"><input type="email" placeholder="Email Address" className="bg-gray-800 rounded-l-lg px-4 py-2 w-full focus:outline-none" /><button className="bg-blue-600 px-4 py-2 rounded-r-lg">Go</button></div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">&copy; 2026 RestInn. All rights reserved.</div>
    </footer>
  );
};

export default Footer;