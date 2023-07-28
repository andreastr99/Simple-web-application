import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ show, message, variant, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Set the duration here (e.g., 3000 milliseconds = 3 seconds)

      return () => clearTimeout(timer); // Clear the timer when the component unmounts or when show changes
    }
  }, [show, onClose]);

  return (
    <div className="d-flex justify-content-start">
      {show && (
        <Alert variant={variant}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default AlertMessage;
