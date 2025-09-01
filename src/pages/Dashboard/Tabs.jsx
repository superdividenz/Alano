// src/pages/Dashboard/Tabs.jsx
import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabList = ["contacts", "signups"];

  return (
    <div className="flex space-x-4 border-b">
      {tabList.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 font-medium transition-colors ${
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
