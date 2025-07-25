// src/components/Booking/TableReservation.jsx
import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const TableReservation = ({ table, onClose }) => {
  // Defensive fallback: ensure seats array exists
  const seatsArray = table?.seats ?? [];
  const availableSeatsCount = seatsArray.filter(seat => !seat.taken).length;

  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleReserve = async () => {
    if (!name.trim() || seats < 1) {
      alert("Please provide your name and a valid number of seats.");
      return;
    }
    if (seats > availableSeatsCount) {
      alert("Not enough seats available at this table.");
      return;
    }

    setLoading(true);

    try {
      const tableRef = doc(db, "tables", table.id);

      // Find seatNumbers of free seats to reserve
      const freeSeats = seatsArray.filter(seat => !seat.taken).slice(0, seats);
      const seatNumbersToReserve = freeSeats.map(seat => seat.seatNumber);

      // Update seats array marking reserved seats
      const updatedSeats = seatsArray.map(seat =>
        seatNumbersToReserve.includes(seat.seatNumber)
          ? { ...seat, taken: true, reservedBy: name }
          : seat
      );

      await updateDoc(tableRef, {
        seats: updatedSeats,
      });

      alert("Reservation successful!");
      onClose();
    } catch (error) {
      console.error("Error reserving table:", error);
      alert("Failed to reserve table.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        Reserve Table {table?.tableNumber ?? "N/A"}
      </h2>
      <p className="mb-2 text-center">
        Available seats: {availableSeatsCount}
      </p>
      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 w-full rounded mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <input
        type="number"
        min="1"
        max={availableSeatsCount}
        placeholder="Number of Seats"
        className="border p-2 w-full rounded mb-3"
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        disabled={loading}
      />
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleReserve}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Reserving..." : "Reserve"}
        </button>
      </div>
    </div>
  );
};

export default TableReservation;
