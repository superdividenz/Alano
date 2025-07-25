// src/components/seat-reservation/SeatsDashboard.js
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const TOTAL_SEATS = 600;

const SeatsDashboard = () => {
  const [tables, setTables] = useState([]);
  const [reservedSeats, setReservedSeats] = useState(0);

  useEffect(() => {
    // Listen for table updates in Firestore
    const unsubscribe = onSnapshot(collection(db, "tables"), (snapshot) => {
      const tablesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTables(tablesData);

      // Defensive: count reserved seats
      const total = tablesData.reduce((sum, table) => {
        const seats = table?.seats ?? [];
        // Use your seat property for "taken" (or "reserved")
        return sum + seats.filter((seat) => seat.taken === true).length;
      }, 0);

      setReservedSeats(total);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seats Dashboard</h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold">
          Reserved Seats: {reservedSeats} / {TOTAL_SEATS}
        </h2>
        <p className="text-gray-600">
          Remaining Seats: {TOTAL_SEATS - reservedSeats}
        </p>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => {
          const seats = table?.seats ?? [];

          return (
            <div
              key={table.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-3">
                Table {table.tableNumber ?? table.number ?? "N/A"} (
                {seats.length} seats)
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {seats.length === 0 && <p>No seats found.</p>}
                {seats.map((seat, index) => (
                  <div
                    key={seat.seatNumber ?? seat.number ?? index}
                    className={`p-2 rounded text-center text-sm font-medium ${
                      seat.taken
                        ? "bg-red-400 text-white"
                        : "bg-green-200 text-black"
                    }`}
                  >
                    {seat.seatNumber ?? seat.number ?? "?"}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatsDashboard;
