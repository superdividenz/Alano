// src/components/seat-reservation/firestoreHelpers.js
import { db } from "../../firebase";
import { collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";

export async function getTables() {
  const tablesSnap = await getDocs(collection(db, "tables"));
  return tablesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function reserveSeat(tableId, seatNumber, reserverName) {
  const tableRef = doc(db, "tables", tableId);
  const tableSnap = await getDoc(tableRef);

  if (!tableSnap.exists()) {
    throw new Error("Table not found");
  }

  const tableData = tableSnap.data();

  if (!tableData.seats) {
    throw new Error("No seats data found");
  }

  const seatIndex = tableData.seats.findIndex(
    (seat) => seat.seatNumber === seatNumber
  );

  if (seatIndex === -1) {
    throw new Error("Seat number invalid");
  }

  if (tableData.seats[seatIndex].taken) {
    throw new Error("Seat already reserved.");
  }

  // Mark seat as taken with reserver's name
  const updatedSeats = [...tableData.seats];
  updatedSeats[seatIndex] = {
    ...updatedSeats[seatIndex],
    taken: true,
    reservedBy: reserverName,
  };

  await updateDoc(tableRef, {
    seats: updatedSeats,
  });
}
