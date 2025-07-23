// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = ({ onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div>
            <span className="mr-4 font-medium">Logged in as: {userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Ticket Transactions</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Item</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ id, item, price, quantity, timestamp }) => (
                <tr key={id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{item}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {timestamp?.toDate
                      ? timestamp.toDate().toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
