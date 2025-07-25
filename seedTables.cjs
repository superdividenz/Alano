const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedTables() {
  const tablesCollection = db.collection("tables");

  for (let tableNum = 1; tableNum <= 60; tableNum++) {
    const seats = [];
    for (let seatNum = 1; seatNum <= 10; seatNum++) {
      seats.push({ seatNumber: seatNum, taken: false });
    }

    const tableDoc = {
      tableNumber: tableNum,
      seats,
    };

    try {
      await tablesCollection.doc(`table-${tableNum}`).set(tableDoc);
      console.log(`Table ${tableNum} seeded successfully.`);
    } catch (error) {
      console.error(`Error seeding table ${tableNum}:`, error);
    }
  }
  console.log("Seeding complete.");
}

seedTables();
