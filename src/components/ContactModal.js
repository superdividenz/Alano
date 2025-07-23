import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const ContactModal = ({ show, handleClose }) => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    AOS.refresh();
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
        data-aos="fade-in"
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative mx-4 sm:mx-0"
          data-aos="zoom-in"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close Contact Modal"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition text-3xl font-bold focus:outline-none"
          >
            &times;
          </button>

          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
            Contact Us
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />

            <textarea
              name="message_body"
              placeholder="Message"
              rows={6}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
