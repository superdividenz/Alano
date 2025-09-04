import React, { useState, useRef } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loader from "../pages/Dashboard/Loader";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TICKET_OPTIONS = [
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

const TicketModal = ({ handleClose }) => {
  const modalRef = useRef();

  const [selectedOption, setSelectedOption] = useState(TICKET_OPTIONS[0]);
  const [preference, setPreference] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
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
        notify,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-auto"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] p-6 sm:p-8 shadow-2xl overflow-auto relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          disabled={loading}
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Get Your Tickets
        </h2>

        <div className="space-y-3">
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
              placeholder={input.placeholder}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          ))}

          {/* Single ticket select for both Firestore & PayPal */}
          <select
            name="ticket"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          >
            {TICKET_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <input
            type="text"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            disabled={loading}
            placeholder="Preference (pickup/mailed)"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />

          <input
            type="text"
            value={scholarship}
            onChange={(e) => setScholarship(e.target.value)}
            disabled={loading}
            placeholder="Scholarship options"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />

          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 rounded transition"
            />
            Notify me of future Alano events
          </label>

          {successMessage && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <FaCheckCircle /> {successMessage}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <FaExclamationCircle /> {error}
            </div>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 space-y-2">
            {/* PayPal Form */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              className="space-y-2"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="PCBMQQVBP56XE" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="os0" value={selectedOption} />
              <input type="hidden" name="os1" value={preference} />
              <input type="hidden" name="os2" value={scholarship} />

              <button type="submit" className="w-full mt-1">
                <img
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                  alt="Buy Now"
                  className="mx-auto"
                />
              </button>
            </form>

            <button
              onClick={handleSubmitWithoutPayment}
              className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg text-sm transition"
            >
              Submit Without Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
