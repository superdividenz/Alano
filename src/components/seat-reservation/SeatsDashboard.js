// src/components/seat-reservation/SeatsDashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ALL_SEATS = [
  "A1","A2","A3","A4","A5","A6","A7","A8","A9","A10",
  "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10",
  "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10",
  "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10",
];

const SeatsDashboard = () => {
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ticket_transactions"),
      (snapshot) => {
        const seats = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.seats && Array.isArray(data.seats)) {
            seats.push(...data.seats);
          }
        });
        setReservedSeats(seats);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading seat reservations...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Seat Reservations</h2>
      <div className="grid grid-cols-10 gap-2">
        {ALL_SEATS.map((seat) => {
          const taken = reservedSeats.includes(seat);
          return (
            <div
              key={seat}
              className={`p-2 text-center rounded-md font-medium ${
                taken ? "bg-red-500 text-white" : "bg-green-200 text-gray-800"
              }`}
            >
              {seat}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-gray-600">
        <span className="bg-green-200 px-2 py-1 rounded">Available</span>{" "}
        <span className="bg-red-500 text-white px-2 py-1 rounded">Reserved</span>
      </p>
    </div>
  );
};

export default SeatsDashboard;
