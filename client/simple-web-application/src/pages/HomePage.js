import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage(){
    return(
      <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg">
        <Link to="/home" className="navbar-brand m-2">Dashboard</Link>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link ,-2">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar" style={{"background": "#f1f7fe"}}>
            <ul className="nav flex-column">
              {/* Add your vertical navbar options */}
              <li className="nav-item">
                <a className="nav-link" href="/">Option 1</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Option 2</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Option 3</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Option 4</a>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
          <div className="col-md-10 bg-white">
            <section className="section-content">
              {/* Add your main section content */}
              <h2>User Management</h2>
              <table className="table">
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
                  </tr>
                </thead>
                <tbody>
                  <tr  className='mt-5'>
                    <td>1</td>
                    <td>John</td>
                    <td>Doe</td> 
                    <td>Admin</td>
                    <td>johndoe@example.com</td>
                    <td>skill</td>
                    <td><span class="status text-success">&bull;</span> Active</td>
                    <td>24</td>
                    <td>  
                      <button className="btn btn-primary m-1">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  {/* Add more rows for other users */}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>

    )
}

