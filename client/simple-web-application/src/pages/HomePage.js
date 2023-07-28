import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import EmployeeModal from './EmployeeModal';
import { formatDate } from '../components/AssistingFunctions'
import AxiosRequests from '../components/axios';
import AlertMessage from '../components/AlertMessage';

export default function HomePage() {
  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    variant: '',
  })

  const handleCloseAlert = () => {
    setAlertState({ show: false });
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditEmployee = (updatedEmployee) => {
    setData(prevData => prevData.map(employee => (employee.employee_id === updatedEmployee.employee_id ? updatedEmployee : employee)));
  };

    // Function to add new employee to the data state
    const handleAddEmployee = (employee_id, newEmployee) => {
      console.log("sdfsd " + employee_id + " "+ newEmployee.employee_id);
      setData(prevData => [...prevData, newEmployee]);
    };
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // const handleLogout = useCallback(() => {
  //   localStorage.removeItem('token');
  //   navigate("/");
  // }, [navigate]);


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
        setData(prevData => prevData.filter(employee => employee.employee_id !== employee_id));
        // console.log(res);
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   AxiosRequests.getAllEmployees()
  //     .then(res => setData(res.data))
  //     .catch(function (error) {
  //         handleLogout();
  //     })
  // }, [])

  useEffect(() => {
    // Convert the useEffect into an async function
    const fetchData = async () => {
      try {
        const res = await AxiosRequests.getAllEmployees();
        setData(res.data);
      } catch (error) {
        handleLogout();
      }
    };

    // Call the async function to fetch the data
    fetchData();
  }, []);

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
            <EmployeeModal showModal={showModal} handleClose={handleCloseModal} setAlertState={setAlertState} employee={null} title={"Add Employee"} onAddEmployee={handleAddEmployee} />
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
                {data.map((employee) => {
                  return <tr key={employee.employee_id}>
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
                      <EmployeeModal showModal={showEditModal} handleClose={handleCloseEditModal} setAlertState={setAlertState} employee={selectedEmployee} title={"Edit Employee"} onEditEmployee={handleEditEmployee}  />
                      <button onClick={() => handleDelete(employee.employee_id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-start">
            <AlertMessage show={alertState.show} message={alertState.message} variant={alertState.variant} onClose={handleCloseAlert} />
          </div>
        </main>
      </div>
    </div>
  )
}