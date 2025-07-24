import React, { useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loader from "../pages/Dashboard/Loader";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TicketModal = ({ handleClose }) => {
  const modalRef = useRef();

  // Close when clicking outside of the modal content
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const ticketOptions = [
    { qty: 1, label: "Single Banquet Seat", price: 46.0 },
    { qty: 2, label: "2 Banquet Seats", price: 92.0 },
    { qty: 4, label: "4 Banquet Seats", price: 184.0 },
    { qty: 6, label: "6 Banquet Seats", price: 276.0 },
    { qty: 8, label: "8 Banquet Seats", price: 368.0 },
    { qty: 10, label: "Full Table of 10 Seats", price: 460.0 },
  ];

  const [selectedOption, setSelectedOption] = useState(ticketOptions[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const totalPrice = selectedOption.price;

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !address.trim() || !phone.trim()) {
      setError("Please fill out all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
        qty: selectedOption.qty,
        label: selectedOption.label,
        price: totalPrice,
        status: "unpaid",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Reservation submitted! You may pay later.");
      setTimeout(() => {
        setLoading(false);
        handleClose();
      }, 2000);
    } catch (err) {
      setError("Failed to submit reservation. Please try again.");
      setLoading(false);
    }
  };

  const handlePayPalSuccess = async (details) => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "ticket_transactions"), {
        name,
        email,
        address,
        phone,
        qty: selectedOption.qty,
        label: selectedOption.label,
        price: totalPrice,
        status: "paid",
        payer: details.payer.name.given_name,
        paymentID: details.id,
        createdAt: serverTimestamp(),
      });
      setSuccessMessage("Payment successful! Your reservation is confirmed.");
      setTimeout(() => {
        setLoading(false);
        handleClose();
      }, 2000);
    } catch (err) {
      setError("Payment succeeded but failed to save transaction.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          disabled={loading}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Get Your Tickets</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your full name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your email"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your address"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your phone"
          />
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedOption.label}
            onChange={(e) =>
              setSelectedOption(ticketOptions.find((opt) => opt.label === e.target.value))
            }
            disabled={loading}
          >
            {ticketOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label} - ${option.price.toFixed(2)}
              </option>
            ))}
          </select>

          <div className="text-lg font-semibold text-center">
            Total: ${totalPrice.toFixed(2)}
          </div>

          {successMessage && (
            <div className="text-green-600 flex items-center gap-2">
              <FaCheckCircle /> {successMessage}
            </div>
          )}

          {error && (
            <div className="text-red-600 flex items-center gap-2">
              <FaExclamationCircle /> {error}
            </div>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-6">
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalPrice.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    handlePayPalSuccess(details);
                  }}
                  onError={(err) => {
                    setError("PayPal error occurred.");
                    console.error(err);
                  }}
                />
              </PayPalScriptProvider>
            </div>

            <div className="my-4 text-center text-gray-400 font-medium">OR</div>

            <button
              onClick={handleSubmitWithoutPayment}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-md transition duration-200"
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
