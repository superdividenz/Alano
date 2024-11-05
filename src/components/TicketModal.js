// src/components/TicketModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TicketModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Tickets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="PCBMQQVBP56XE" />
          <Form.Group>
            <Form.Label htmlFor="banquetTicket">Banquet Ticket</Form.Label>
            <Form.Control as="select" name="os0" id="banquetTicket">
              <option value="Single Banquet Seat">Single Banquet Seat $46.00 USD</option>
              <option value="2 Banquet Seats">2 Banquet Seats $92.00 USD</option>
              <option value="4 Banquet Seats">4 Banquet Seats $184.00 USD</option>
              <option value="6 Banquet Seats">6 Banquet Seats $276.00 USD</option>
              <option value="8 Banquet Seats">8 Banquet Seats $368.00 USD</option>
              <option value="Full Table of 10 Seats">Full Table of 10 Seats $460.00 USD</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">Buy Now</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;