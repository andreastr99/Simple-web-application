import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ show, message, variant, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if(variant==='danger'){
          window.location.reload();
          onClose();
        }
        onClose();
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer when the component unmounts or when show changes
    }
  }, [show, variant, onClose]);

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
