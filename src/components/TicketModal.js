import React, { useState, useRef } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loader from "../pages/Dashboard/Loader";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TicketModal = ({ handleClose }) => {
  const modalRef = useRef();

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
  };

  const ticketOptions = [
    "Single Banquet Seat",
    "2 Banquet Seats",
    "4 Banquet Seats",
    "6 Banquet Seats",
    "8 Banquet Seats",
    "Full Table of 10 Seats",
    "Single Seat + 1 Newbie Scholarship",
    "Two Seats + 1 Newbie Scholarship",
    "4 Seats + 1 Newbie Scholarship",
    "6 Seats + 1 Newbie Scholarship",
  ];

  const [selectedOption, setSelectedOption] = useState(ticketOptions[0]);
  const [preference, setPreference] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notify, setNotify] = useState(false); // ✅ New state
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSubmitWithoutPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setSuccessMessage(null);

    try {
      await addDoc(collection(db, "ticket_transactions"), {
        name,
        email,
        address,
        phone,
        ticket: selectedOption,
        preference,
        scholarship,
        notify, // ✅ Save to Firestore
        status: "unpaid",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Reservation submitted! You may pay later.");
      setTimeout(() => {
        setLoading(false);
        handleClose();
      }, 2000);
    } catch {
      setError("Failed to submit reservation.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4 sm:px-4 sm:py-6 overflow-auto"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-sm p-4 sm:p-6 shadow-lg relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          disabled={loading}
        >
          ×
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Get Your Tickets
        </h2>

        <div className="space-y-2">
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
              className="w-full border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder={input.placeholder}
            />
          ))}

          {/* Ticket select */}
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {ticketOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <input
            type="text"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            disabled={loading}
            placeholder="Preference (pickup/mailed)"
            className="w-full border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            type="text"
            value={scholarship}
            onChange={(e) => setScholarship(e.target.value)}
            disabled={loading}
            placeholder="Scholarship options"
            className="w-full border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* ✅ Notification Checkbox */}
          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              disabled={loading}
            />
            Would you like to be notified of future Alano events?
          </label>

          {successMessage && (
            <div className="text-green-600 flex items-center gap-2 text-sm">
              <FaCheckCircle /> {successMessage}
            </div>
          )}
          {error && (
            <div className="text-red-600 flex items-center gap-2 text-sm">
              <FaExclamationCircle /> {error}
            </div>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* PayPal Form */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              className="mt-3 space-y-2"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="PCBMQQVBP56XE" />
              <input type="hidden" name="currency_code" value="USD" />

              <select
                name="os0"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {ticketOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <input
                type="text"
                name="os1"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                placeholder="Name & preference (pickup/mailed)"
                className="w-full border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <input
                type="text"
                name="os2"
                value={scholarship}
                onChange={(e) => setScholarship(e.target.value)}
                placeholder="Scholarship options"
                className="w-full border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <button type="submit" className="w-full mt-1">
                <img
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                  alt="Buy Now"
                  className="mx-auto"
                />
              </button>
            </form>

            {/* Submit Without Payment */}
            <button
              onClick={handleSubmitWithoutPayment}
              className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded text-sm transition"
            >
              Submit Without Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
