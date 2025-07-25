// src/components/Booking/TablesList.jsx
import React from "react";

const TablesList = ({ tables, onTableClick }) => {
  if (!tables || tables.length === 0) {
    return <p className="text-center text-gray-600">No tables available yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tables.map((table) => {
        // Safely get seats array, default to empty array if missing
        const seats = table.seats ?? [];
        // Count how many seats are not taken
        const availableSeats = seats.filter(seat => !seat.taken).length;

        return (
          <div
            key={table.id}
            onClick={() => onTableClick(table)}
            className={`cursor-pointer p-4 rounded-lg shadow transition ${
              availableSeats > 0
                ? "bg-green-100 hover:bg-green-200"
                : "bg-red-200 cursor-not-allowed"
            }`}
          >
            <h3 className="text-xl font-semibold text-center">
              Table {table.tableNumber}
            </h3>
            <p className="text-center mt-2">
              {availableSeats} seats remaining
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TablesList;
