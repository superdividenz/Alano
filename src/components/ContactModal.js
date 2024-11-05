// src/components/ContactModal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactModal = ({ show, handleClose }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact Us</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="" method="POST">
              <div className="form-group">
                <input required type="text" className="form-control" name="name" placeholder="Name" />
              </div>
              <div className="form-group">
                <input required type="email" className="form-control" name="email" placeholder="Email" />
              </div>
              <textarea className="form-control" rows="6" name="message_body" placeholder="Message"></textarea>
              <button type="submit" className="btn btn-primary mt-3">SEND</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
