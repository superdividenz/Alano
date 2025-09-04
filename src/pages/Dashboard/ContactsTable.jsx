// src/pages/Dashboard/DataTable.jsx
import React from "react";

const DataTable = ({ data, type, onDelete }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 mt-4">No {type} available.</p>;
  }

  const headers = Object.keys(data[0])
    .filter((key) => key !== "id")
    .sort((a, b) =>
      a === "paymentStatus" ? 1 : b === "paymentStatus" ? -1 : 0
    );

  const renderCell = (row, key) => {
    if (key === "paymentStatus" || key === "status") {
      const isPaid =
        row[key]?.toLowerCase() === "paid" || row[key]?.toLowerCase() === "completed";
      return (
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row[key]}
        </span>
      );
    }
    if (row[key]?.toDate) return row[key].toDate().toLocaleString();
    return String(row[key]);
  };

  const handleRespond = (row) => {
    if (row.email) {
      window.location.href = `mailto:${row.email}?subject=Response&body=Hi ${row.name || ""},`;
    } else if (row.phone) {
      window.open(`sms:${row.phone}?body=Hi ${row.name || ""},`, "_blank");
    } else {
      alert("No email or phone number available to respond.");
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                className="border px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
              >
                {key.toUpperCase()}
              </th>
            ))}
            <th className="border px-3 py-2 font-medium text-gray-700 whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {headers.map((key) => (
                <td
                  key={key}
                  className="border px-3 py-2 text-gray-800 whitespace-nowrap"
                >
                  {renderCell(row, key)}
                </td>
              ))}
              <td className="border px-3 py-2 flex flex-wrap gap-2">
                {type !== "ticket_transactions" && (
                  <button
                    onClick={() => handleRespond(row)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Respond
                  </button>
                )}
                <button
                  onClick={() => onDelete(row.id, type)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
