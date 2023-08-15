import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ProtectedRoute from './helpers/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

import './styles/App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<HomePage />} path="/home" exact />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}


export default App;