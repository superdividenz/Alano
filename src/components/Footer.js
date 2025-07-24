// src/components/Footer.js
import React from "react";

const Footer = ({ onAdminLoginClick }) => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>© 2025 MySite</p>
      <button
        onClick={onAdminLoginClick}
        className="mt-2 underline text-blue-300 hover:text-white transition"
      >
        Admin Login
      </button>
    </footer>
  );
};

export default Footer;
