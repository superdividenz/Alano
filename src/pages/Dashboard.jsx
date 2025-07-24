import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { ClipLoader } from "react-spinners";

const Dashboard = ({ onLogout }) => {
  const [contacts, setContacts] = useState([]);
  const [signups, setSignups] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingSignups, setLoadingSignups] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts" or "signups"
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to contacts collection in real-time
    const unsubscribeContacts = onSnapshot(
      collection(db, "contacts"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContacts(data);
        setLoadingContacts(false);
      },
      (err) => {
        console.error("Contacts listener error:", err);
        setError("Failed to load contacts.");
        setLoadingContacts(false);
      }
    );

    // Listen to signups collection in real-time
    const unsubscribeSignups = onSnapshot(
      collection(db, "signups"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSignups(data);
        setLoadingSignups(false);
      },
      (err) => {
        console.error("Signups listener error:", err);
        setError("Failed to load signups.");
        setLoadingSignups(false);
      }
    );

    // Cleanup on unmount
    return () => {
      unsubscribeContacts();
      unsubscribeSignups();
    };
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  const loading = loadingContacts || loadingSignups;

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const handleDelete = async (id) => {
    const collectionName = activeTab === "contacts" ? "contacts" : "signups";
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  const exportCSV = () => {
    const dataToExport = activeTab === "contacts" ? contacts : signups;
    if (!dataToExport.length) {
      alert("No data to export.");
      return;
    }
    const csvData = Papa.unparse(
      dataToExport.map(({ id, ...rest }) => ({
        ...rest,
        timestamp: rest.timestamp?.toDate
          ? rest.timestamp.toDate().toLocaleString()
          : rest.timestamp || "",
      }))
    );
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${activeTab}_export_${new Date().toISOString()}.csv`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
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

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-300">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "contacts"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            Contact Messages ({contacts.length})
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "signups"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("signups")}
          >
            Signups ({signups.length})
          </button>
          <button
            onClick={exportCSV}
            className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Export CSV
          </button>
        </div>

        {/* Loading/Error */}
        {loading ? (
          <div className="flex justify-center mt-12">
            <ClipLoader color="#2563EB" size={50} />
          </div>
        ) : error ? (
          <p className="text-red-600 text-center mt-8">{error}</p>
        ) : activeTab === "contacts" ? (
          contacts.length === 0 ? (
            <p>No contact messages found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Message</th>
                  <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(({ id, name, email, message_body, timestamp }) => (
                  <tr key={id} className="text-center align-top">
                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                    <td className="border border-gray-300 px-4 py-2">{email}</td>
                    <td className="border border-gray-300 px-4 py-2 max-w-xs break-words">{message_body}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {timestamp?.toDate
                        ? timestamp.toDate().toLocaleString()
                        : ""}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={`mailto:${email}?subject=Response to your message`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Respond
                      </a>
                      <button
                        onClick={() => handleDelete(id)}
                        className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : signups.length === 0 ? (
          <p>No signups found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signups.map(({ id, name, email, timestamp }) => (
                <tr key={id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
                  <td className="border border-gray-300 px-4 py-2">{email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {timestamp?.toDate
                      ? timestamp.toDate().toLocaleString()
                      : ""}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
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
