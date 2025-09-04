// src/components/TicketModal.js
import React, { useRef, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// ---- Ticket Options
const TICKET_OPTIONS = [
  { label: "Single Banquet Seat", price: 40 },
  { label: "2 Banquet Seats", price: 75 },
  { label: "4 Banquet Seats", price: 140 },
  { label: "6 Banquet Seats", price: 200 },
  { label: "8 Banquet Seats", price: 260 },
  { label: "Full Table of 10 Seats", price: 320 },
  { label: "Single Seat + 1 Newbie Scholarship", price: 60 },
  { label: "Two Seats + 1 Newbie Scholarship", price: 100 },
  { label: "4 Seats + 1 Newbie Scholarship", price: 160 },
  { label: "6 Seats + 1 Newbie Scholarship", price: 220 },
];

const TicketModal = ({ handleClose }) => {
  const modalRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(TICKET_OPTIONS[0]);
  const [preference, setPreference] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notify, setNotify] = useState(false);

  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !address.trim() || !phone.trim()) {
      setError("Please fill out all required fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleCreateReservation = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "ticket_transactions"), {
        name,
        email,
        address,
        phone,
        ticket: selectedOption.label,
        price: selectedOption.price,
        preference,
        scholarship,
        notify,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setTransactionId(docRef.id);
      setSuccessMessage("Reservation created! Please complete your PayPal payment.");
    } catch (e) {
      console.error(e);
      setError("Failed to create reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/40 backdrop-blur-sm px-3 py-4 sm:px-4 sm:py-6 overflow-auto
                 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl relative 
                   transform transition-all duration-300 scale-95 animate-slideUp"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 
                     transition-colors text-xl font-bold"
          disabled={loading}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          🎟️ Get Your Tickets
        </h2>

        {!transactionId ? (
          <div className="space-y-3">
            {/* Inputs */}
            {[{ value: name, set: setName, type: "text", placeholder: "Full Name" },
              { value: email, set: setEmail, type: "email", placeholder: "Email" },
              { value: address, set: setAddress, type: "text", placeholder: "Address" },
              { value: phone, set: setPhone, type: "tel", placeholder: "Phone" }
            ].map((input, idx) => (
              <input
                key={idx}
                type={input.type}
                value={input.value}
                onChange={(e) => input.set(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 
                           px-3 py-2 text-sm shadow-sm
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                           transition"
                placeholder={input.placeholder}
              />
            ))}

            {/* Ticket select */}
            <select
              value={selectedOption.label}
              onChange={(e) =>
                setSelectedOption(
                  TICKET_OPTIONS.find((opt) => opt.label === e.target.value)
                )
              }
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 
                         px-3 py-2 text-sm shadow-sm
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         transition"
            >
              {TICKET_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} (${opt.price})
                </option>
              ))}
            </select>

            {/* Extras */}
            <input
              type="text"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              disabled={loading}
              placeholder="Preference (pickup / mailed)"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 
                         px-3 py-2 text-sm shadow-sm
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         transition"
            />

            <input
              type="text"
              value={scholarship}
              onChange={(e) => setScholarship(e.target.value)}
              disabled={loading}
              placeholder="Scholarship options"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 
                         px-3 py-2 text-sm shadow-sm
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         transition"
            />

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 
                           focus:ring-blue-400"
              />
              Notify me of future Alano events
            </label>

            {error && (
              <div className="text-red-600 flex items-center gap-2 text-sm mt-1">
                <FaExclamationCircle /> {error}
              </div>
            )}

            <button
              onClick={handleCreateReservation}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 
                         hover:from-blue-600 hover:to-blue-700 
                         text-white font-medium py-2.5 rounded-lg 
                         shadow-md transition-transform transform hover:scale-[1.01]"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Reservation created! Please complete payment:
            </p>

            {successMessage && (
              <div className="mt-2 text-green-600 flex items-center justify-center gap-2 text-sm">
                <FaCheckCircle /> {successMessage}
              </div>
            )}

            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              className="mt-4 space-y-3"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="PCBMQQVBP56XE" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="os0" value={selectedOption.label} />
              <input type="hidden" name="os1" value={preference} />
              <input type="hidden" name="os2" value={scholarship} />

              <button type="submit" className="inline-block">
                <img
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                  alt="Buy Now"
                />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
