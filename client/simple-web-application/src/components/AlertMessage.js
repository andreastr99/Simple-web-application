import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'

const AlertMessage = ({ show, message, variant, statusCode, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if(statusCode === 401){
          // window.location.reload();
          navigate('/')
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
          {message ? message : 'Unauthorized'}
        </Alert>
      )}
    </div>
  );
};

export default AlertMessage;
