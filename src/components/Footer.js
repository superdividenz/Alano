// src/components/Footer.jsx
import React from "react";

const Footer = ({ onAdminLoginClick }) => {
  return (
    <footer className="fixed bottom-0 w-full py-3 bg-transparent text-center text-white backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <span>Alano Banquet | &copy; 2025</span>
        <button
          onClick={onAdminLoginClick}
          className="text-sm underline hover:text-gray-300"
          aria-label="Admin Login"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
};

export default Footer;
