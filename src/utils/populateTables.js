import 'dotenv/config'; // automatically loads .env into process.env
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const TOTAL_TABLES = 41;
const SEATS_PER_TABLE = 10;
const TABLE_LABELS = ["Venezia", "Florenz"];

async function populateTables() {
  try {
    for (let i = 1; i <= TOTAL_TABLES; i++) {
      const tableId = `Table ${i}`;
      const label = TABLE_LABELS[i % TABLE_LABELS.length];

      const seats = [];
      for (let j = 1; j <= SEATS_PER_TABLE; j++) {
        seats.push({ seatNumber: j, reserved: false });
      }

      await addDoc(collection(db, "tables"), {
        tableId,
        label,
        seats,
      });

      console.log(`Added ${tableId} with ${SEATS_PER_TABLE} seats.`);
    }
    console.log("All tables populated successfully!");
  } catch (err) {
    console.error(err);
  }
}

populateTables();
