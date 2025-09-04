// src/components/seat-reservation/SeatSelector.jsx
import React from "react";

const SeatSelector = ({ tableId, seats, onSeatSelect, selectedSeats }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 sm:gap-3 justify-items-center">
      {seats.map((seat) => {
        const seatKey = `${tableId}-${seat}`;
        const isSelected = selectedSeats.includes(seatKey);

        return (
          <button
            key={seatKey}
            onClick={() => onSeatSelect(seat)}
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border font-medium transition-colors
              ${isSelected ? "bg-blue-500 text-white border-blue-700" : "bg-blue-200 hover:bg-blue-400"}
            `}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelector;
