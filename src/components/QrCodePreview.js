import React from "react";
import { Modal } from 'react-bootstrap';

const QrCodePreview = ({ show, onHide, image }) => {
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>My Shop QR Code</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="img-responsive text-center p-5">
          <img className="img-fluid border p-5" alt="Shop QR Code" src={image} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QrCodePreview;
