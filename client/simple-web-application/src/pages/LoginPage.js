import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosRequests from '../components/axios';
import login from '../assets/group.png';


// Για να πάρουμε ό,τι δίνει ο χρήστης στο email και password
// input χρησιμοποιούμε το useState hook απο την React
export default function LoginPage() {
    const navigate = useNavigate();

    const [validCredentials, setValidCredentials] = useState(true);

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    //δέχεται ένα event object (πχ e) και καλεί την συνάρτηση setValues
    //όπου παίρνει το προηγούμενο state ως argument
    //ενημερώνει το state object με δυναμική ανάθεση καινούργιας τιμής που βασίζεται
    //στα e.target.name και e.target.value 
    const handleInputChange = (e) => {
        setValues(prevData => ({ ...prevData, [e.target.name]: [e.target.value] }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formattedValues = {
            username: `${values.username}`,
            password: `${values.password}`
        };

        // AxiosRequests.login(formattedValues)
        //     .then(res => {
        //         if (res.data.token) {
        //             localStorage.setItem("token", res.data.token);
        //             navigate("/home");
        //         }
        //     })
        //     .catch(err => {
        //         if (err.response.status === 401) {
        //             setValidCredentials(false);
        //         }else {
        //             console.error('An unexpected error occurred.');
        //           }
        //     })

        try {
            const res = await AxiosRequests.login(formattedValues);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/home");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setValidCredentials(false);
            } else {
                console.error('An unexpected error occurred.');
            }
        }

    }

    return (
        <section className="vh-100 background-stripe">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-5">
                            <div className="card border-radius shadow" style={{ "background": "#f1f7fe", "maxWidth": "450px", "margin": "auto" }}>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <img src={login} alt="login" style={{ width: "120px" }} className="mb-2" />
                                        <h2 className="text-uppercase text-center mb-3">Login</h2>
                                    </div>

                                    <form action="/home" onSubmit={handleFormSubmit}>

                                        <div className="form-outline mb-4">
                                            <input onChange={handleInputChange} type="text" id="username" name="username" value={values.username} className="form-control form-control-lg" required />
                                            <label className="form-label" htmlFor="email">Your Email</label>
                                        </div>

                                        <div className="form-outline ">
                                            <input onChange={handleInputChange} type="password" id="password" name="password" value={values.password} className="form-control form-control-lg" required />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <div className="text-center">
                                            {!validCredentials && <p style={{ "color": "red" }}>Wrong username or password</p>}
                                        </div>

                                        <div className="d-grid gap-2 mb-5">
                                            <button type="submit" className="btn-login">Login</button>
                                        </div>

                                        <div className="mb-5 text-center text-muted">
                                            <p className="mb-0">Don't have an account? <Link to="/register">Create an account</Link>.</p>
                                            <p className="mb-0"><Link to="/forget-password">Forgot password?</Link></p>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}