import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import login from '../assets/login.png';

import '../styles/App.css'
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
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(values)
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-color">
            <div className="shadow bg-form">
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                    <img src={login} alt="login"  style={{ width: '150px', height: 'auto', margin: '0 auto' }}className="mr-2" />
                    </div>
                        <form action="/home" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input onChange={handleInput} type="text" className="form-control" id="email" name='email' placeholder="Enter email" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input onChange={handleInput} type="password" className="form-control" id="password" name='password' placeholder="Enter password"  required/>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn-login">Login</button>
                            </div>
                            <div className="text-center">
                                <p className="mb-0">Don't have an account? <Link to="/register">Create an account</Link>.</p>
                                <p className="mb-0"><Link to="/forget-password">Forget password?</Link></p>
                            </div>
                        </form>
                </div>
            </div>
      </div>
    )
}