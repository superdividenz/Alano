// Dashboard/ExportButton.jsx
import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const ExportButton = ({ data, fileName }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      Export CSV
    </button>
  );
};

export default ExportButton;
