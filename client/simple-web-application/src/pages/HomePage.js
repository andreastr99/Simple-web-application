import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosRequests from '../api/axios';
import EmployeeTable from '../components/EmployeeTable';

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {

    localStorage.removeItem('token');
    await AxiosRequests.logout();
    navigate('/')
  };

  // ----------- When login functionality -----------
  const [data, setData] = useState([]);
  const [skillLevels, setSkillLevels] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

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
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      // navigate('/')
    }
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
          <h3 className="mb-5 mt-3" style={{ "display": "inline-block", "width": "auto" }}>User Management</h3>
          <div>
            {data.length > 0 ? (
              <EmployeeTable data={data} setData={setData} skillLevels={skillLevels} />
            ) : (
              // Show a message when data is not available
              <p>No data available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}