// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "./Header";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import ExportButton from "./ExportButton";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const Dashboard = () => {
  // Initialize activeTab from localStorage or default to "signups"
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "signups"
  );

  const [contacts, setContacts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Persist activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Fetch contacts and payments
  useEffect(() => {
    setLoading(true);

    const unsubscribeContacts = onSnapshot(
      collection(db, "contacts"),
      (snapshot) => {
        setContacts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => setError(err.message)
    );

    const unsubscribePayments = onSnapshot(
      collection(db, "ticket_transactions"),
      (snapshot) => {
        setPayments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => setError(err.message)
    );

    return () => {
      unsubscribeContacts();
      unsubscribePayments();
    };
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id));
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
    }
  };

  // Decide which data to show
  let data = [];
  let dataType = "";

  if (activeTab === "contacts") {
    data = contacts;
    dataType = "contacts";
  } else if (activeTab === "signups") {
    data = payments
      .filter((p) =>
        searchTerm
          ? Object.values(p).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          : true
      )
      .filter((p) =>
        paymentFilter === "all" ? true : p.status === paymentFilter
      );
    dataType = "ticket_transactions";
  }

  const onLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="p-6 space-y-6">
      <Header onLogout={onLogout} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "signups" && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search signups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full sm:w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      <ExportButton data={data} fileName={activeTab} />
      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loader />
      ) : (
        <DataTable data={data} type={dataType} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Dashboard;
