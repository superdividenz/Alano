// src/components/seat-reservation/TableSelector.jsx
import React, { useState } from "react";
import SeatSelector from "./SeatSelector";

const TABLES = [
  { id: "T1", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: "T2", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: "T3", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  // Add more tables as needed
];

const TableSelector = ({ onSelectionChange }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (tableId, seatNumber) => {
    const seatKey = `${tableId}-${seatNumber}`;
    let updatedSeats;

    if (selectedSeats.includes(seatKey)) {
      updatedSeats = selectedSeats.filter((s) => s !== seatKey);
    } else {
      updatedSeats = [...selectedSeats, seatKey];
    }

    setSelectedSeats(updatedSeats);
    onSelectionChange(updatedSeats);
  };

  return (
    <div className="space-y-6">
      {TABLES.map((table) => (
        <div key={table.id} className="p-4 border rounded-lg shadow bg-white/80">
          <h3 className="text-lg font-bold mb-2">
            Table {table.id.replace("T", "")}
          </h3>
          <SeatSelector
            tableId={table.id}
            seats={table.seats}
            onSeatSelect={(seat) => handleSeatSelect(table.id, seat)}
            selectedSeats={selectedSeats}
          />
        </div>
      ))}
    </div>
  );
};

export default TableSelector;
