import React, { useEffect, useRef } from "react";
import TableSelector from "./TableSelector";

const ReservationModal = ({ onClose, onSeatsSelected }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div ref={ref} className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
        <TableSelector onSeatsSelected={onSeatsSelected} />
      </div>
    </div>
  );
};

export default ReservationModal;
