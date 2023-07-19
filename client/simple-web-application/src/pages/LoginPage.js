import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import login from '../assets/group.png';


// Για να πάρουμε ό,τι δίνει ο χρήστης στο email και password
// input χρησιμοποιούμε το useState hook απο την React
export default function LoginPage() {
    //Αρχικές τιμές το κενό
    //ορίζω ένα variable state που ονομάζεται values και μια συνάρτηση setValues για
    //να ενημερώνει αυτό το state variable.
    //Επιστρέφει έναν πίνακα με δύο στοιχεία και όποτε θέλω να ενημερώσω τις τιμές
    //καλώ την setValue συνάρτηση.
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    //δέχεται ένα event object (πχ e) και καλεί την συνάρτηση setValues
    //όπου παίρνει το προηγούμενο state ως argument
    //ενημερώνει το state object με δυναμική ανάθεση καινούργιας τιμής που βασίζεται
    //στα e.target.name και e.target.value 
    const handleInput = (e) =>{
        setValues(prevData => ({...prevData, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(values)
    }

    return (
    <section className="vh-100 background-stripe">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-5">
                <div className="card border-radius shadow" style={{"background": "#f1f7fe", "maxWidth": "450px", "margin": "auto"}}>
                    <div className="card-body p-4">
                        <div className="text-center">
                            <img src={login} alt="login"  style={{ width: "120px"}}className="mb-2" />
                            <h2 className="text-uppercase text-center mb-3">Login</h2>
                        </div>

                        <form action="/home" onSubmit={handleSubmit}>

                            <div className="form-outline mb-4">
                                <input onChange={handleInput} type="email" id="email" name="email" className="form-control form-control-lg" required/>
                                <label className="form-label" htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange={handleInput} type="password" id="password" name="password" className="form-control form-control-lg"  required/>
                                <label className="form-label" htmlFor="password">Password</label>
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