// Dashboard/Header.jsx
import React from 'react';
import { LogOut } from 'lucide-react';

const Header = () => (
  <header className="flex justify-between items-center mb-8 px-4 py-3 bg-white shadow-md rounded-xl">
    <h1 className="text-3xl font-semibold text-gray-800">📊 Admin Dashboard</h1>
    <button
      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-lg shadow-sm"
    >
      <LogOut size={18} />
      Logout
    </button>
  </header>
);

export default Header;
