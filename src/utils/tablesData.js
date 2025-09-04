// fallback table structure if Firestore isn’t used
export const TABLES = Array.from({ length: 41 }, (_, i) => ({
  tableId: `Table ${i + 1}`,
  seats: Array.from({ length: 10 }, (_, j) => ({
    seatNumber: j + 1,
    reserved: false,
  })),
}));
