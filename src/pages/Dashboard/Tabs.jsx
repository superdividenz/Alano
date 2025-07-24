// src/pages/Dashboard/Tabs.jsx
import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["contacts", "signups", "payments"];

  return (
    <div className="flex gap-4 border-b border-gray-300 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-semibold capitalize ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
