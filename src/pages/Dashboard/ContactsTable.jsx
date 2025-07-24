import React from "react";

const ContactsTable = ({ data, onDelete }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 mt-4">No contacts available.</p>;
  }

  const headers = Object.keys(data[0]).filter((key) => key !== "id");

  const handleRespond = (row) => {
    if (row.email) {
      window.location.href = `mailto:${row.email}?subject=Response to your contact message&body=Hi ${
        row.name || ""
      },`;
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
                className="border px-4 py-2 text-left font-medium text-gray-700"
              >
                {key.toUpperCase()}
              </th>
            ))}
            <th className="border px-4 py-2 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {headers.map((key) => (
                <td key={key} className="border px-4 py-2 text-gray-800">
                  {row[key]?.toDate
                    ? row[key].toDate().toLocaleString()
                    : String(row[key])}
                </td>
              ))}
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleRespond(row)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  Respond
                </button>
                <button
                  onClick={() => onDelete(row.id, "contacts")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
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

export default ContactsTable;
