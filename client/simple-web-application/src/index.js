import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './helpers/AuthProvider'

// createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
createRoot(document.getElementById('root')).render(<App />);