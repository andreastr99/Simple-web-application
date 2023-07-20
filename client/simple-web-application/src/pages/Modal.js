import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

export default function EditModal () {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
    {/* <button onClick={showModal}>ww</button> */}
    <Modal show={isOpen} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Hi</Modal.Title>
      </Modal.Header>
      <Modal.Body>The body</Modal.Body>
      <Modal.Footer>
        <button onClick={hideModal}>Cancel</button>
        <button>Save</button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};