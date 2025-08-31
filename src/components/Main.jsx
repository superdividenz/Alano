import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import SignupProgress from "./SignupProgress";
import TicketModal from "./TicketModal";
import ContactModal from "./ContactModal";
import Footer from "./Footer";
import backgroundImg from "./images/Background.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Main = ({ onAdminLoginClick }) => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-700/50 backdrop-blur-sm pointer-events-none"></div>

      <header className="relative flex-grow flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <div className="max-w-3xl space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md"
            data-aos="fade-down"
          >
            84th ANNUAL
            <br />
            ALANO BANQUET
          </h1>
          <h3
            className="text-2xl md:text-3xl drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Saturday November 23, 2025
          </h3>
          <h3
            className="text-xl md:text-2xl drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Mari G, from Toronto, Canada. Speaker at 8:00 PM.
          </h3>
          <h3
            className="text-xl md:text-2xl drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            2050 Dorsett Village Plaza, Maryland Heights, MO 63043
          </h3>

          {/* Progress Bar */}
          <div data-aos="fade-up" data-aos-delay="500">
            <SignupProgress />
          </div>

          {/* Buttons */}
          <div
            className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <button
              onClick={() => setShowContactModal(true)}
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
      </header>

      {/* Modals */}
      {showTicketModal && (
        <TicketModal handleClose={() => setShowTicketModal(false)} />
      )}
      {showContactModal && (
        <ContactModal handleClose={() => setShowContactModal(false)} />
      )}

      {/* Transparent Footer */}
      <Footer onAdminLoginClick={onAdminLoginClick} />
    </div>
  );
};

export default Main;
