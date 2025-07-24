import React from "react";

const Footer = ({ onAdminLoginClick }) => {
  return (
    <footer
      className="w-full flex justify-between items-center px-6 py-3 text-white"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "transparent" }}
    >
      <p className="text-sm drop-shadow-md">© 2025 Alanabanquet.org</p>
      <button
        onClick={onAdminLoginClick}
        className="underline text-blue-300 hover:text-white transition text-sm drop-shadow-md"
      >
        Admin Login
      </button>
    </footer>
  );
};

export default Footer;
