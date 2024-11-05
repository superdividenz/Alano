// src/components/Header.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import TicketModal from './TicketModal'; // Make sure this path is correct

const Header = ({ onContactClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <header className="header">
      <div className="content">
        <h1 className="animate__animated animate__pulse">
          <span>83rd ANNUAL<br />ALANO BANQUET</span>
        </h1>
        <h3 className="animate__animated animate__pulse">
          <span>Saturday November 23, 2024</span>
        </h3>
        <h3 className="animate__animated animate__pulse">
          <span>Kent B. from Decatur, IL.</span>
        </h3>
        <div className="button-container">
          <button onClick={onContactClick} className="btn btn-contact animate__animated animate__pulse">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </button>
          <button onClick={handleShowModal} className="btn btn-purchase animate__animated animate__pulse">
            <FontAwesomeIcon icon={faTicketAlt} /> Purchase Tickets
          </button>
        </div>
      </div>
      <TicketModal show={showModal} handleClose={handleCloseModal} />
    </header>
  );
}

export default Header;