import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../firebase"; // adjust path based on your project
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ticketOptions = [
  { qty: 1, label: "Single Banquet Seat", price: 46.0 },
  { qty: 2, label: "2 Banquet Seats", price: 92.0 },
  { qty: 4, label: "4 Banquet Seats", price: 184.0 },
  { qty: 6, label: "6 Banquet Seats", price: 276.0 },
  { qty: 8, label: "8 Banquet Seats", price: 368.0 },
  { qty: 10, label: "Full Table of 10 Seats", price: 460.0 },
];

const TicketModal = ({ show, handleClose }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const selectedOption =
    ticketOptions.find((opt) => opt.qty === quantity) || ticketOptions[0];

  const handlePayPalClick = async () => {
    try {
      // Record transaction intent in Firebase
      await addDoc(collection(db, "ticket_transactions"), {
        qty: quantity,
        label: selectedOption.label,
        price: selectedOption.price,
        status: "initiated",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error recording transaction: ", error);
    }

    // Open PayPal payment window
    const baseUrl = "https://www.paypal.com/cgi-bin/webscr";
    const params = new URLSearchParams({
      cmd: "_xclick",
      business: "alano@aastl.org",
      item_name: selectedOption.label,
      amount: selectedOption.price.toFixed(2),
      currency_code: "USD",
    });

    const paypalUrl = `${baseUrl}?${params.toString()}`;
    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=700"
    );
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      data-aos="fade-in"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative mx-4 sm:mx-0"
        data-aos="zoom-in"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Purchase Tickets
        </h2>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Select number of tickets:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {ticketOptions.map(({ qty, label, price }) => (
              <option key={qty} value={qty}>
                {label} – ${price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePayPalClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          Pay with PayPal
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={handleClose}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
