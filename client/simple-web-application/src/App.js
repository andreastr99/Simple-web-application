import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <LoginPage/> } />
          <Route path="/home" element={ <HomePage/> } />
          <Route path="/register" element={ <RegisterPage/> } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;