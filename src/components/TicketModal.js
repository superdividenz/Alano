import React from 'react';

const TicketModal = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4">Purchase Tickets</h2>

        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="PCBMQQVBP56XE" />

          <div className="mb-4">
            <label
              htmlFor="banquetTicket"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Banquet Ticket
            </label>
            <select
              name="os0"
              id="banquetTicket"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Single Banquet Seat">
                Single Banquet Seat $46.00 USD
              </option>
              <option value="2 Banquet Seats">
                2 Banquet Seats $92.00 USD
              </option>
              <option value="4 Banquet Seats">
                4 Banquet Seats $184.00 USD
              </option>
              <option value="6 Banquet Seats">
                6 Banquet Seats $276.00 USD
              </option>
              <option value="8 Banquet Seats">
                8 Banquet Seats $368.00 USD
              </option>
              <option value="Full Table of 10 Seats">
                Full Table of 10 Seats $460.00 USD
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Buy Now
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleClose}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
