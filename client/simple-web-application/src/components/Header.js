import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AxiosRequests from '../api/axios';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {

        localStorage.removeItem('token');
        await AxiosRequests.logout();
        navigate('/')
    };
    return (
        <header className="p-3" style={{ background: "#3e4684" }}>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> */}
                    </a>

                    <ul className="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 text-white">Home</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <div className="input-group">
                            <input type="search" className="form-control form-control-dark text-bg-light" placeholder="Search..." aria-label="Search" disabled />
                            <span className="input-group-text" id="search-icon">
                                <BiSearch />
                            </span>
                        </div>
                    </form>
                    <button onClick={handleLogout} className="btn text-white" style={{background: ""}}>Logout</button>
                </div>
            </div>
        </header>
    )
}

export default Header