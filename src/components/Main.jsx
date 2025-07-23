import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import TicketModal from "./TicketModal";
import ContactModal from "./ContactModal"; // <-- import ContactModal
import backgroundImg from "./images/Background.png";

const Main = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <header
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-700/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
            84th ANNUAL
            <br />
            ALANO BANQUET
          </h1>
          <h3 className="text-2xl md:text-3xl drop-shadow-md">
            Saturday November 23, 2025
          </h3>
          <h3 className="text-xl md:text-2xl drop-shadow-md">
            Kent B. from Decatur, IL.
          </h3>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowContactModal(true)} // open Contact modal here
              className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Contact
            </button>
            <button
              onClick={() => setShowTicketModal(true)}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faTicketAlt} />
              Purchase Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TicketModal
        show={showTicketModal}
        handleClose={() => setShowTicketModal(false)}
      />
      <ContactModal
        show={showContactModal}
        handleClose={() => setShowContactModal(false)}
      />
    </header>
  );
};

export default Main;
