// src/components/Booking/Booking.jsx
import React, { useState, useEffect } from "react";
import TablesList from "./TablesList";
import TableReservation from "./TableReservation";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Booking = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tables"), (snapshot) => {
      const fetchedTables = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTables(fetchedTables);
    });

    return () => unsubscribe();
  }, []);

  const handleTableClick = (table) => {
    const availableSeats = (table?.seats ?? []).filter(seat => !seat.taken).length;
    if (availableSeats > 0) {
      setSelectedTable(table);
    } else {
      alert("This table is fully booked.");
    }
  };

  return (
    <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Table Reservations</h1>
      {!selectedTable ? (
        <TablesList tables={tables} onTableClick={handleTableClick} />
      ) : (
        <TableReservation
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
};

export default Booking;
