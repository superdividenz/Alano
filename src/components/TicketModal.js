import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ticketOptions = [
  { qty: 1, label: "Single Banquet Seat", price: 46 },
  { qty: 2, label: "2 Banquet Seats", price: 92 },
  { qty: 4, label: "4 Banquet Seats", price: 184 },
  { qty: 6, label: "6 Banquet Seats", price: 276 },
  { qty: 8, label: "8 Banquet Seats", price: 368 },
  { qty: 10, label: "Full Table of 10 Seats", price: 460 },
];

const loadPaypalScript = (clientId) => {
  return new Promise((resolve, reject) => {
    if (window.paypal) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
    document.body.appendChild(script);
  });
};

const TicketModal = ({ show, handleClose }) => {
  const paypalRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const clientId = 'YOUR_PAYPAL_CLIENT_ID'; // Replace with your actual client ID

  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (!show) return;

    loadPaypalScript(clientId)
      .then(() => {
        const selectedOption = ticketOptions.find(opt => opt.qty === quantity) || ticketOptions[0];

        const paypalButtons = window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: selectedOption.label,
                  amount: {
                    currency_code: 'USD',
                    value: selectedOption.price.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              handleClose();
            });
          },
          onError: (err) => {
            console.error('PayPal Checkout Error:', err);
            alert('There was an error processing your payment.');
          },
        });

        paypalButtons.render(paypalRef.current);

        return () => {
          paypalButtons.close();
        };
      })
      .catch(err => {
        console.error(err);
      });

  }, [show, quantity, handleClose, clientId]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      data-aos="fade-in"
      aria-modal="true"
      role="dialog"
      aria-labelledby="purchase-tickets-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative mx-4 sm:mx-0"
        data-aos="zoom-in"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2
          id="purchase-tickets-title"
          className="text-3xl font-extrabold mb-6 text-center text-gray-900"
        >
          Purchase Tickets
        </h2>

        <div className="mb-6">
          <label
            htmlFor="ticketSelect"
            className="block mb-2 font-semibold text-gray-700"
          >
            Select number of tickets:
          </label>
          <select
            id="ticketSelect"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {ticketOptions.map(({ qty, label, price }) => (
              <option key={qty} value={qty}>
                {label} – ${price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div ref={paypalRef} />

        <div className="mt-6 text-center">
          <button
            onClick={handleClose}
            className="text-sm text-gray-600 hover:text-gray-800 underline focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
