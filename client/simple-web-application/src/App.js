import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import './styles/App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<HomePage />} path="/home" exact />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}


export default App;