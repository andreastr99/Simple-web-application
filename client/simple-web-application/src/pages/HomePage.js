import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import EmployeeModal from './EmployeeModal';
import { formatDate, getSkill } from '../components/AssistingFunctions'
import AxiosRequests from '../components/axios';
import AlertMessage from '../components/AlertMessage';

export default function HomePage() {
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  // ----------- Alert Message -----------
  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    variant: '',
    statusCode: ''
  })

  const handleCloseAlert = () => {
    setAlertState({ show: false });
  };
  // -------------------------------------


  // --------------Add Modal--------------
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  // -------------------------------------

  // --------------Edit Modal--------------
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  // ---------------------------------------

  // ---------------------------------------
  const handleEditEmployee = (updatedEmployee) => {
    setData(prevData => prevData.map(employee => (employee.employee_id === updatedEmployee.employee_id ? updatedEmployee : employee)));
  };

  const handleAddEmployee = (newEmployee) => {
    setData(prevData => [...prevData, newEmployee]);
  };
  // ---------------------------------------

  const handleLogout = () => {
  
    localStorage.removeItem('token');
    AxiosRequests.logout().then(navigate("/"))
    
  };

  const handleDelete = (employee_id) => {
    console.log(employee_id);

    AxiosRequests.deleteEmployee(employee_id)
      .then(res => {
        setAlertState({ variant: 'success', show: true, message: res.data.message, statusCode: 200 })
        setData(prevData => prevData.filter(employee => employee.employee_id !== employee_id));
      })
      .catch(function (err) {
        setAlertState({ variant: 'danger', show: true, message: err.response.data.message, statusCode: err.response.request.status })
      })
  }
  
  // ----------- When login functionality -----------
  const [data, setData] = useState([]);
  const [skillLevels, setSkillLevels] = useState([])
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {

      await AxiosRequests.getAllEmployees()
        .then(res => {
          setData(res.data);
        });

      await AxiosRequests.getSkillLevels()
        .then(res => {
          setSkillLevels(res.data)

        })
    } catch (error) {
      console.log(error);
      //  // Check if the error is due to a 401 status (Unauthorized)
       if (error.response && error.response.status === 401) {
        // Redirect to the login page
        navigate('/');
      }
      // navigate("/")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  // ------------------------------------------------
  
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
          </div>
        </nav>

        {/* Users Table */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h2 className="mb-5 mt-3">User Management</h2>
          <div className="d-flex justify-content-start mb-2">
            <button type="button" className="btn btn-success" onClick={handleShowAddModal}>Add Employee +</button>
            <EmployeeModal showModal={showAddModal} handleClose={handleCloseAddModal} setAlertState={setAlertState} employee={null} title={"Add Employee"} onAddEmployee={handleAddEmployee} skillLevels={skillLevels} />
          </div>
          <div className="table-responsive">
            <div>
              {data.length > 0 ? (
                // Render the table when data is available
                <table className="table table-hover" >
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Date of Birth</th>
                      <th>Email</th>
                      <th>Skill level</th>
                      <th>Active</th>
                      <th>Age</th>
                      <th style={{ "textAlign": "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((employee) => {
                      return <tr key={employee.employee_id}>
                        {/* <td>{employee.employee_id}</td> */}
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{formatDate(employee.dob)}</td>
                        <td>{employee.email}</td>
                        {/* <td>{console.log(getSkill(employee.skill_level))}</td> */}
                        <td>{getSkill(employee.skill_level, skillLevels)}</td>
                        {/* <td>{console.log(skillLevels)}</td> */}
                        <td style={{ "textAlign": "center" }}>
                          {(employee.active) ? (
                            <span className="text-success ">&#x2713;</span>
                          ) : (
                            <span className="text-danger">&#x2717;</span>
                          )}
                        </td>
                        <td>{employee.age}</td>
                        <td>
                          <button onClick={() => handleShowEditModal(employee)} className="btn btn-sm btn-primary mx-2">Edit</button>
                          <EmployeeModal showModal={showEditModal} handleClose={handleCloseEditModal} setAlertState={setAlertState} employee={selectedEmployee} title={"Edit Employee"} onEditEmployee={handleEditEmployee} skillLevels={skillLevels} />
                          <button onClick={() => handleDelete(employee.employee_id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              ) : (
                // Show a message when data is not available
                <p>No data available.</p>
              )}
            </div>

          </div>

          <div className="d-flex justify-content-start">
            <AlertMessage show={alertState.show} message={alertState.message} variant={alertState.variant} statusCode={alertState.statusCode} onClose={handleCloseAlert} />
          </div>
        </main>
      </div>
    </div>
  )
}