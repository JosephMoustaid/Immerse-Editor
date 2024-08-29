import React from "react";
import "./Modal.css"; // Import the custom CSS

const Modal = ({ modalTitle, modalContent, modalButtonText, onClose }) => {
  return (
    <div className="custom-modal">
      <div className="custom-modal-dialog">
        <div className="custom-modal-content">
          <div className="custom-modal-header">
            <h5 className="custom-modal-title">{modalTitle}</h5>
          </div>
          <div className="custom-modal-body">
            <ul>
              {modalContent.map((step, index) => (
                <li key={index}>{step}</li> // Corrected: Added the return statement
              ))}
            </ul>
          </div>
          <div className="custom-modal-footer">
            <button type="button" className="custom-modal-button" onClick={onClose}>
              {modalButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
