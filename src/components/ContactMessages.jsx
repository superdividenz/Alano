import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "contacts"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading contacts:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact message?")) {
      try {
        await deleteDoc(doc(db, "contacts", id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  if (loading) return <p>Loading contact messages...</p>;
  if (contacts.length === 0) return <p>No contact messages found.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, email, message_body }) => (
            <tr key={id} className="text-center">
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2">{email}</td>
              <td className="border px-4 py-2 max-w-xs break-words">{message_body}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMessages;
