import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddModal from './AddModal';
import EditModal from './EditModal';
import { formatDate } from '../components/AssistingFunctions'
import Alert from 'react-bootstrap/Alert';
import AxiosRequests from '../components/api';



export default function HomePage() {

  
  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    variant: '',
  })

  useEffect(() => {
    if (alertState) {
      const timer = setTimeout(() => {
        setAlertState({ show: false });
      }, 3000); // Set the duration here (e.g., 3000 milliseconds = 3 seconds)

      return () => clearTimeout(timer); // Clear the timer when the component unmounts or when showAlert changes
    }
  }, [alertState]);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showEditModal, setEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditModal(true, employee);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleDelete = (employee_id) => {
    console.log(employee_id);
   
    AxiosRequests.deleteEmployee(employee_id)
    .then(res => {
      // window.location.reload();
      setAlertState({ variant: 'success', show: true, message: res.data.message })
      // console.log(res);
    })
      .catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    AxiosRequests.getAllEmployees()
      .then(res => setData(res.data))
      .catch(function (error) {
        handleLogout();
      })
  }, [])

  return (
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
            <AddModal showModal={showModal} handleClose={handleCloseModal} setAlertState={setAlertState} />
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
                {data.map((employee, index) => {
                  return <tr key={index}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    {/* <td>{employee.dob}</td> */}
                    {/* <td>{new Date(employee.dob).toLocaleDateString()}</td> */}
                    <td>{formatDate(employee.dob)}</td>
                    <td>{employee.email}</td>
                    <td>{employee.skill_level}</td>
                    <td>{employee.active}</td>
                    <td>{employee.age}</td>
                    <td>
                      <button onClick={() => handleEditModal(employee)} className="btn btn-sm btn-primary mx-2">Edit</button>
                      <EditModal showModal={showEditModal} handleClose={handleCloseEditModal} employee={selectedEmployee} setAlertState={setAlertState} />
                      <button onClick={() => handleDelete(employee.employee_id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-start">
            {alertState.show && (
              <Alert variant={alertState.variant}>
                {alertState.message}
              </Alert>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}