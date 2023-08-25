import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosRequests from '../api/axios';
import EmployeeTable from '../components/EmployeeTable';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();

  // const handleLogout = async () => {

  //   localStorage.removeItem('token');
  //   await AxiosRequests.logout();
  //   navigate('/')
  // };

  // ----------- When login functionality -----------
  const [data, setData] = useState([]);
  const [skillLevels, setSkillLevels] = useState([])
  const [loading, setLoading] = useState(true);

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
    // <div className="container-fluid">
    //   <nav className="navbar navbar-expand-lg">
    //     <h2 className="p-2">Admin Dashboard</h2>
    //     <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <button onClick={handleLogout} className="custom-right-padding btn text-white">Logout</button>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>

    //   <div className="row">
    //     {/* Vertical Navbar */}
    //     <nav className="col-md-3 col-lg-2 d-md-block sidebar">
    //       <div className="position-sticky">
    //       </div>
    //     </nav>

    //     {/* Users Table */}
    //     <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    //       <h3 className="mb-5 mt-3" style={{ "display": "inline-block", "width": "auto" }}>User Management</h3>
    //       <div>
    //         {data.length > 0 ? (
    //           <EmployeeTable data={data} setData={setData} skillLevels={skillLevels} />
    //         ) : (
    //           // Show a message when data is not available
    //           <p>No data available.</p>
    //         )}
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div>
      <Header />
      <main className="container py-5" style={{height: "85vh"}}>
        <div className="row">
          {/* <Sidebar /> */}
          <div className="col">
            <article>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
              </div>
              <div>
                {data.length > 0 ? (
                  <EmployeeTable data={data} setData={setData} skillLevels={skillLevels} />
                ) : (
                  // Show a message when data is not available
                  <p>No data available.</p>
                )}
              </div>
            </article>
          </div>
          <canvas className="my-4" id="myChart" width="900" height="180"></canvas>
        </div>
      </main>
      <Footer />
    </div>
  )
}