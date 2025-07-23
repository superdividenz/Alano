import React from 'react';

const ContactModal = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

          <form>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message_body"
                placeholder="Message"
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
