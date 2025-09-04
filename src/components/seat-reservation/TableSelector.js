// src/components/seat-reservation/TableSelector.js
import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../firebase";

const TableSelector = ({ selectedSeats = [], setSelectedSeats }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tables"));
        const tablesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTables(tablesData);
      } catch (err) {
        console.error("Error fetching tables:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const toggleSeat = (tableId, seatNumber) => {
    const seatId = `${tableId}-${seatNumber}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  if (loading) return <p>Loading tables...</p>;

  return (
    <div className="max-h-[70vh] overflow-y-auto p-4">
      {tables.map(table => (
        <div key={table.id} className="mb-4 border p-3 rounded">
          <h3 className="font-bold mb-2">{table.tableId}</h3>
          <div className="grid grid-cols-5 gap-2">
            {table.seats.map(seat => {
              const seatId = `${table.tableId}-${seat.seatNumber}`;
              const isSelected = selectedSeats.includes(seatId);
              const isReserved = seat.reserved;
              return (
                <button
                  key={seat.seatNumber}
                  disabled={isReserved}
                  onClick={() => toggleSeat(table.tableId, seat.seatNumber)}
                  className={`px-2 py-1 rounded ${
                    isReserved
                      ? "bg-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {seat.seatNumber}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSelector;
