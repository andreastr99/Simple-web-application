import { React,  useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AddModal from './AddModal';
import EditModal from './EditModal';




export default function HomePage(){
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  useEffect(() =>{
    axios.get('http://localhost:8081/api/Employees',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setData(res.data))
    .catch(error => console.log(error));
  }, [])
  return(
     <div className="container-fluid">
      <nav className="navbar navbar-expand-lg">
        <h2 className="p-2">Admin Dashboard</h2>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button onClick={handleLogout} className="custom-right-padding btn text-white">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    
      <div className="row">
        {/* Vertical Navbar */}
        <nav className="col-md-3 col-lg-2 d-md-block sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#option1">Option 1</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#option2">Option 2</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#option3">aa</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Users Table */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h2 className="mb-5 mt-3">User Management</h2>
          <div className="d-flex justify-content-start mb-2">
            <button type="button" className="btn btn-success" onClick={handleShowModal}>Add Employee +</button>
            <AddModal showModal={showModal} handleClose={handleCloseModal} />
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Email</th>
                  <th>Skill level</th>
                  <th>Active</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee, index) =>{
                  return <tr key={index}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.dob}</td>
                    <td>{employee.email}</td>
                    <td>{employee.skill_level}</td>
                    <td>{employee.active}</td>
                    <td>{employee.age}</td>
                    <td>
                      
                        <button className="btn btn-sm btn-primary mx-2" onClick={handleShowModal}>Edit</button>
                        {/* <EditModal showModal={showModal} handleClose={handleCloseModal} /> */}
                      
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}