// src/components/seat-reservation/ReservationModal.jsx
import React from "react";
import TableSelector from "./TableSelector";

const ReservationModal = ({ onClose, onSeatsSelected }) => {
  const handleSeatsConfirmed = (seats) => {
    onSeatsSelected(seats);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Pick Your Table & Seats</h2>
        <TableSelector onSelectionChange={handleSeatsConfirmed} />
      </div>
    </div>
  );
};

export default ReservationModal;
