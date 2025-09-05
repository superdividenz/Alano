// src/components/Main.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTicketAlt,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import SignupProgress from "./SignupProgress";
import TicketModal from "./TicketModal";
import ContactModal from "./ContactModal";
import FlyerModal from "./FlyerModal";
import Footer from "./Footer";
import backgroundImg from "./images/Background.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Main = ({ onAdminLoginClick }) => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [flyerUrl, setFlyerUrl] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-700/70 backdrop-blur-sm pointer-events-none"></div>

      <header className="relative flex-grow flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <div className="max-w-3xl space-y-4">
          {/* Event Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg"
            data-aos="fade-down"
          >
            85th ANNUAL
            <br />
            ALANO BANQUET
          </h1>

          {/* Event Date */}
          <h3
            className="text-xl sm:text-2xl md:text-3xl drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Saturday, November 22, 2025
          </h3>

          {/* Speaker */}
          <h3
            className="text-lg sm:text-xl md:text-2xl drop-shadow-md transition duration-300 transform hover:scale-105 hover:text-yellow-400 cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Mari G, from Toronto, Canada. Speaker at 8:00 PM.
          </h3>

          {/* Address with Google Maps link */}
          <a
            href="https://www.google.com/maps/place/2050+Dorsett+Village+Plaza,+Maryland+Heights,+MO+63043"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 transform hover:scale-105 cursor-pointer inline-block"
          >
            <h3
              className="text-lg sm:text-xl md:text-2xl drop-shadow-md text-white hover:text-yellow-400"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              2050 Dorsett Village Plaza, Maryland Heights, MO 63043
            </h3>
          </a>

          {/* Progress Bar */}
          <div data-aos="fade-up" data-aos-delay="500">
            <SignupProgress />
          </div>

          {/* Action Buttons */}
          <div
            className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <button
              onClick={() => setShowContactModal(true)}
              className="flex items-center justify-center gap-2 bg-white text-blue-800 font-semibold px-5 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-200 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Contact
            </button>

            <button
              onClick={() => setShowTicketModal(true)}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition duration-200 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faTicketAlt} />
              Tickets
            </button>

            <button
              onClick={() => {
                setFlyerUrl("/flyers/2025 Banquet Layout.pdf");
                setShowFlyerModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faFilePdf} />
              Floor Plan
            </button>

            <button
              onClick={() => {
                setFlyerUrl("/flyers/2025-11-22 AlanoBanquet2_hl Flyer.pdf");
                setShowFlyerModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faFilePdf} />
              Flyer
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
      {showFlyerModal && (
        <FlyerModal
          pdfUrl={flyerUrl}
          handleClose={() => setShowFlyerModal(false)}
        />
      )}

      {/* Footer */}
      <Footer onAdminLoginClick={onAdminLoginClick} />
    </div>
  );
};

export default Main;
