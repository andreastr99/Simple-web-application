import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { logout } from '../helpers/AssistingFunctions'
import AxiosRequests from '../api/axios';
import AlertMessage from '../components/AlertMessage';
import EmployeeTable from '../components/EmployeeTable';
import AuthContext from '../helpers/AuthProvider';

export default function HomePage() {
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

  const handleLogout = async () => {
    setAuth(false)
    localStorage.removeItem('token');
    await AxiosRequests.logout();
  };

  // ----------- When login functionality -----------
  const [data, setData] = useState([]);
  const [skillLevels, setSkillLevels] = useState([])
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext)

  useEffect(() => {
    const controller = new AbortController();
    if (auth) {
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
          // Check if the error is due to a 401 status (Unauthorized)
          if (error.response) {
            // Redirect to the login page
            setAuth(false)
            // navigate('/');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
    return () => {
      controller.abort();
      navigate('/')
    }
  }, []);

  useEffect(() => {
    if (!auth)
      navigate('/');
  }, [auth])

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
          <div>
            {data.length > 0 ? (
              <EmployeeTable data={data} setData={setData} skillLevels={skillLevels} setAlertState={setAlertState} />
            ) : (
              // Show a message when data is not available
              <p>No data available.</p>
            )}
          </div>
          <div className="d-flex justify-content-start">
            <AlertMessage show={alertState.show} message={alertState.message} variant={alertState.variant} statusCode={alertState.statusCode} onClose={handleCloseAlert} />
          </div>
        </main>
      </div>
    </div>
  )
}