// src/pages/Dashboard/Tabs.jsx
import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 border-b">
      {["contacts", "signups"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 font-medium ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
