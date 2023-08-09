import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

// function App() {

//   return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginPage/>} />
//           <Route path="/home" element={ <ProtectedRoute><HomePage/></ProtectedRoute> } />
//           {/* <Route path='/home' element={<HomePage/>} /> */}
//           <Route path="/register" element={ <RegisterPage/> } />
//           <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
//         </Routes>
//       </BrowserRouter>
//   );
// }

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          {/* <Route element ={<ProtectedRoute/>}> */}
            <Route element={<HomePage /> } path="/home" exact/>
          {/* </Route> */}
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
        </Routes>
      </Router>
  );
}


export default App;