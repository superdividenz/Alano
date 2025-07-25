// src/components/seat-reservation/SeatSelector.jsx
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const SeatSelector = ({ tableId, seats, onSeatSelect, selectedSeats }) => {
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    if (!tableId) return;

    const tableRef = doc(db, "tables", tableId);
    const unsubscribe = onSnapshot(tableRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const reserved = (data.seats ?? [])
          .filter((seat) => seat.taken)
          .map((seat) => seat.seatNumber);
        setReservedSeats(reserved);
      }
    });

    return () => unsubscribe();
  }, [tableId]);

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return;
    onSeatSelect(seat);
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {seats.map((seat) => {
        const isReserved = reservedSeats.includes(seat);
        const seatKey = `${tableId}-${seat}`;
        const isSelected = selectedSeats.includes(seatKey);

        return (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            disabled={isReserved}
            className={`w-10 h-10 rounded-full border font-medium 
              ${isReserved ? "bg-gray-400 cursor-not-allowed" : ""}
              ${isSelected ? "bg-blue-500 text-white border-blue-700" : "bg-blue-200 hover:bg-blue-400"} 
              transition-colors duration-200`}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelector;
